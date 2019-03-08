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
import { Equal } from "typeorm";

@Service()
export class ProbGeneratorService {
  private readonly _reccurenceWeight = 1 / 50;
  private _generated: number[];
  private _computed: ProbElementModel[];
  private _totalGenerated: number;

  get Values() {
    return this._computed.map((value) => value.Getable);
  }

  constructor() {
    this._totalGenerated = 0;
    Timing.newDaySubject.subscribe(this.execute.bind(this));
  }

  GenerateDay(dayIndex: number) {
    let correctedDayIndex = Math.abs(dayIndex);
    const weekNumber = Math.floor(correctedDayIndex / 7);
    correctedDayIndex = (correctedDayIndex - weekNumber * 7) - 1;
    const dayProb = probHour[dayIndex];
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
    console.log("UPDATE");
    const existingProb = await ProbModel.findOne({
      where: {
        Date: Timing.currentDayDate
      }
    });
    if (!existingProb) {
      this._generated = this.GenerateDay(Timing.currentDayIndex).kwh;
      this._computed = this.compute(this._totalGenerated, this._generated);
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
      this._totalGenerated = existingProb.Values[existingProb.Values.length - 1].Value;
    }
  }

  private sumEnergy(values: number[]) {
    return values.reduce((total, value) => {
      return total + value;
    }, 0);
  }

  private compute(base: number, values: number[]): ProbElementModel[] {
    let lastComputed = new ProbElementModel(0, 0, base);
    return values.map((value, index) => {
      // y = ax + b
      const newValue = value + lastComputed.Value;
      const nextElement = values[index + 1];
      const nextValue = nextElement ? (nextElement + newValue) : newValue;
      const y = (nextValue - newValue) / (Timing.range * 60);
      lastComputed = new ProbElementModel(
        index,
        y,
        newValue
      );
      return lastComputed;
    });
  }
}
