import { probHour, probReccurence } from "@constant";
import { IProbInfos, IProb, EnergyType, IProbFunction } from "@type";

// TO OPTIMIZE
export class FunctionGenerator {
  // 15 is the interval (minute)
  private static readonly unitPerDay = 24 * 60 / 15;
  private static readonly reccurenceWeight = 1 / 50;

  static generateDay(dayNumber: number) {
    if (dayNumber >= 1 && dayNumber <= 7) {
      const dayIndex = dayNumber - 1;
      const dayProb = probHour[dayIndex];
      const out: IProbFunction = {
        kvah: [],
        kwh: [],
        kvarh: []
      };
      const realEnergy: EnergyType[] = ["kvarh", "kwh"];

      for (let hour = 0; hour < FunctionGenerator.unitPerDay; hour++) {
        realEnergy.map((energyType: EnergyType) => {
          const energyOut = out[energyType];
          const energyHourProb = dayProb[energyType][hour];

          let flatProbs: IProbInfos[] = Object.keys(energyHourProb).map((key): IProbInfos => {
            const hourProbs: IProb = energyHourProb[key];
            return {
              value: Number(key),
              day: dayIndex,
              energyType,
              hour,
              ...hourProbs
            };
          });

          const lastOut = energyOut[energyOut.length - 1];
          if (lastOut > 0) {
            const reccurenceProbs = probReccurence[dayIndex][energyType][lastOut];
            let totalNumberProbs = 0;
            flatProbs = flatProbs.map((prob) => {
              const incrementValue: IProb = reccurenceProbs[String(prob.value)];
              if (incrementValue) {
                prob.number += incrementValue.number * this.reccurenceWeight;
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
      for (let i = 0; i <= this.unitPerDay; i++) {
        out.kvah.push(Math.sqrt(Math.pow(out.kvarh[i], 2) + Math.pow(out.kwh[i], 2)));
      }

      console.log(out);
    } else {
      throw new Error("Need a dayNumber between 1 and 7");
    }
  }
}
