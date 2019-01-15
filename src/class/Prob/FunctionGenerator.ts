import { probHour } from "@constant";
import { IProbInfos, IProb, EnergyType } from "@type";
import { probReccurence } from "src/constant/Prob/ProbReccurence";

// TO OPTIMIZE
export class FunctionGenerator {
  // 15 is the interval (minute)
  private static readonly unitPerDay = 24 * 60 / 15;
  private static readonly reccurenceWeight = 1 / 100;

  static generateDay(dayNumber: number) {
    if (dayNumber >= 1 && dayNumber <= 7) {
      const dayIndex = dayNumber - 1;
      const dayProb = probHour[dayIndex];
      const out = [];
      const energyType: EnergyType = "kavh";
      for (let hour = 0; hour < FunctionGenerator.unitPerDay; hour++) {
        let flatProbs: IProbInfos[] = Object.keys(dayProb[energyType][hour]).map((key): IProbInfos => {
          const hourProbs: IProb = dayProb[energyType][hour][key];
          return {
            value: Number(key),
            day: dayIndex,
            energyType,
            hour,
            ...hourProbs
          };
        });

        const lastOut = out[out.length - 1];
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
            out.push(prob.value);
            break;
          }
        }
      }
      console.log(out);
    } else {
      throw new Error("Need a dayNumber between 1 and 7");
    }
  }
}
