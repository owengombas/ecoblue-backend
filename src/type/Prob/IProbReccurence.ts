import { IProb } from "@type";

export type ProbReccurenceTable = Map<number, Map<number, IProb>>;

export interface IProbReccurence {
  kvah: ProbReccurenceTable;
  kwh: ProbReccurenceTable;
  kvarh: ProbReccurenceTable;
}
