import { Service } from "rakkit";
import {
  IProbInfos,
  IProb,
  EnergyType,
  IProbFunction
} from "../type";
import { probHour, probReccurence } from "../constant";
import { Timing } from "../class";
import { ProbElementModel, ProbModel } from "../models";
import { LessThan } from "typeorm";

@Service()
export class ProbGeneratorService {
  private readonly _reccurenceWeight = 1 / 50;
  private _generated: number[];
  private _prevLastElement: ProbElementModel;
  private _computed: ProbElementModel[];
  private _totalGenerated?: number;

  get Values() {
    if (this._computed) {
      return [
        this._prevLastElement.Getable,
        ...this._computed.map((value) => value.Getable)
      ];
    }
    return [];
  }

  constructor() {
    this._prevLastElement = new ProbElementModel(Timing.unitPerDay - 1, 0, 0);
    Timing.newDaySubject.subscribe(this.execute.bind(this));
  }

  GenerateDay(dayIndex: number) {
    let correctedDayIndex = Math.abs(dayIndex);
    const rawWeekNumber = correctedDayIndex / 7;
    const weekNumber = Number.isInteger(rawWeekNumber) ? rawWeekNumber - 1 : Math.floor(rawWeekNumber);
    correctedDayIndex = (correctedDayIndex - weekNumber * 7) - 1;
    const dayProb = probHour[correctedDayIndex];
    const out: IProbFunction = {
      kvah: [],
      kwh: [],
      kvarh: []
    };
    const realEnergy: EnergyType[] = ["kwh"];

    for (let hour = 0; hour < Timing.unitPerDay; hour++) {
      realEnergy.map((energyType: EnergyType) => {
        const energyOut = out[energyType];
        const energyHourProb = dayProb[energyType][hour];

        let flatProbs: IProbInfos[] = Object.keys(energyHourProb).map((key): IProbInfos => {
          const hourProbs: IProb = energyHourProb[key];
          return {
            value: Number(key),
            day: correctedDayIndex,
            energyType,
            hour,
            ...hourProbs
          };
        });

        const lastOut = energyOut[energyOut.length - 1];
        if (lastOut > 0) {
          const reccurenceProbs = probReccurence[correctedDayIndex][energyType][lastOut];
          let totalNumberProbs = 0;
          flatProbs = flatProbs.map((prob) => {
            const incrementValue: IProb = reccurenceProbs[String(prob.value)];
            if (incrementValue) {
              prob.number += incrementValue.number * this._reccurenceWeight;
            }
            totalNumberProbs += prob.number;
            return prob;
          });
          flatProbs.map((prob) => {
            prob.frequency = prob.number / totalNumberProbs;
            return prob;
          });
        }

        const random = Math.random();
        let increment = 0;
        for (const prob of flatProbs) {
          increment += prob.frequency;
          if (random <= increment) {
            energyOut.push(prob.value);
            break;
          }
        }
      });
    }

    // Calculate kVAh
    for (let i = 0; i <= Timing.unitPerDay; i++) {
      out.kvah.push(
        Math.sqrt(
          Math.pow(out.kvarh[i], 2) + Math.pow(out.kwh[i], 2)
        )
      );
    }

    return out;
  }

  private async execute() {
    const existingProb = await ProbModel.findOne({
      where: {
        Date: Timing.today
      }
    });
    if (this._totalGenerated === undefined) {
      const previousProb = await ProbModel.findOne({
        where: {
          Date: LessThan(Timing.today)
        },
        order: {
          Date: -1
        }
      });
      if (previousProb) {
        this._totalGenerated = previousProb.Values[previousProb.Values.length - 1].Value;
        this._prevLastElement = this.last(previousProb.Values);
      } else {
        this._totalGenerated = 0;
      }
    }
    if (!existingProb) {
      console.log(Timing.currentDayIndex);
      this._generated = this.GenerateDay(Timing.currentDayIndex).kwh;
      this._computed = this.compute(this._generated, this._totalGenerated);
      this._totalGenerated = this.sumEnergy(this._generated);
      const prob = new ProbModel();
      prob.Values = this._computed.map((value) => {
        value.Prob = prob;
        return value;
      });
      await prob.save();
    } else {
      this._generated = [];
      this._computed = (existingProb.Values as ProbElementModel[]);
      this._totalGenerated = this.last(existingProb.Values).Value;
    }
    this._prevLastElement.Slope = this.computeSlope(
      this._prevLastElement.Value,
      this._computed[0].Value
    );
    await this._prevLastElement.save();
  }

  private sumEnergy(values: number[]) {
    return values.reduce((total, value) => {
      return total + value;
    }, 0);
  }

  private compute(values: number[], base: number): ProbElementModel[] {
    let lastComputed = new ProbElementModel(0, 0, base);
    return values.map((value, index) => {
      // y = ax + b
      const newValue = value + lastComputed.Value;
      const nextElement = values[index + 1];
      const nextValue = nextElement ? (nextElement + newValue) : newValue;
      const y = this.computeSlope(newValue, nextValue);
      lastComputed = new ProbElementModel(
        index,
        y,
        newValue
      );
      return lastComputed;
    });
  }

  private computeSlope(value: number, nextValue: number) {
    return nextValue - value;
  }

  private last<ArrayType>(arr: ArrayLike<ArrayType>) {
    return arr[arr.length - 1];
  }
}
