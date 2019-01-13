import { IProb } from '.'

export type ProbReccurenceTable = Map<number, Map<number, IProb>>

export interface IProbReccurence {
  kavh: ProbReccurenceTable
  kwh: ProbReccurenceTable
  kvarh: ProbReccurenceTable
}
