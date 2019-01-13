import { IProb } from '.'

export type ProbHourTable = Map<number, IProb>

export interface IProbHour {
  kavh: ProbHourTable[]
  kwh: ProbHourTable[]
  kvarh: ProbHourTable[]
}
