import { IGetableAnswer } from "..";

export class IGetableQuestion {
  id: number;
  question: string;
  answers: IGetableAnswer[];
}
