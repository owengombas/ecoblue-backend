import { Service } from "rakkit";
import {
  IProbInfos,
  IProb,
  EnergyType,
  IProbFunction,
  IProbTotal,
  IComputedProb,
  IComputedFunction
} from "../../type";
import { probHour, probReccurence } from "../../constant";

@Service()
export class ProbGeneratorService {
  private readonly _reccurenceWeight = 1 / 50;
  private readonly _unitPerDay = 24 * 60 / 15;
  private _generatedToday: IProbFunction;
  private _totalGenerated: IProbTotal;

  get ComputedInfos(): IComputedProb {
    return {
      kvah: this.compute(this._totalGenerated.kvah, this._generatedToday.kvah),
      kvarh: this.compute(this._totalGenerated.kvarh, this._generatedToday.kvarh),
      kwh: this.compute(this._totalGenerated.kwh, this._generatedToday.kwh)
    };
  }

  private get _currentDayIndex() {
    return (new Date()).getDay();
  }

  private get _currentTimeRangeIndex() {
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0, 0, 0
    );
    return Math.floor(((new Date()).getTime() - midnight.getTime()) / 1000 / 60 / 15);
  }

  private get _timeToReachMidnight() {
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0
    );
    return nextMidnight.getTime() - now.getTime();
  }

  constructor() {
    this._totalGenerated = {
      kvah: 0,
      kvarh: 0,
      kwh: 0
    };
  }

  Start() {
    this._generatedToday = this.GenerateDay(this._currentDayIndex);
    setTimeout(() => {
      this.addTotal();
      this.Start();
    }, this._timeToReachMidnight + 1000); // 1s after to be sure that the currentDay is the next day
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
    const realEnergy: EnergyType[] = ["kvarh", "kwh"];

    for (let hour = 0; hour < this._unitPerDay; hour++) {
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
    for (let i = 0; i <= this._unitPerDay; i++) {
      out.kvah.push(Math.sqrt(Math.pow(out.kvarh[i], 2) + Math.pow(out.kwh[i], 2)));
    }

    return out;
  }

  private addTotal() {
    return this._totalGenerated = {
      kvah: this.sumEnergy(this._generatedToday.kvah),
      kvarh: this.sumEnergy(this._generatedToday.kvarh),
      kwh: this.sumEnergy(this._generatedToday.kwh)
    };
  }

  private sumEnergy(values: number[]) {
    return values.reduce((total, value) => total + value, 0);
  }

  private compute(base: number, values: number[]): IComputedFunction[] {
    let lastComputed: IComputedFunction = {
      slope: 0,
      value: base
    };
    return values.map((value) => {
      const y = value - lastComputed.value;
      lastComputed = {
        slope: 1 / y,
        value: lastComputed.value + value
      };
      return lastComputed;
    });
  }
}
