import { IProb } from "..";

export type ProbHourTable = Map<number, IProb>;

export interface IProbHour {
  kvah: ProbHourTable[];
  kwh: ProbHourTable[];
  kvarh: ProbHourTable[];
}
