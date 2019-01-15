import { IProb, EnergyType } from "@type";

export interface IProbInfos extends IProb {
  value: number;
  day: number;
  hour: number;
  energyType: EnergyType;
}
