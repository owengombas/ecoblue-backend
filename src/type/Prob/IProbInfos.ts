import { IProb, EnergyType } from "..";

export interface IProbInfos extends IProb {
  value: number;
  day: number;
  hour: number;
  energyType: EnergyType;
}
