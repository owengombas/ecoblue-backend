import { IGetableAnswer } from "..";

export class IGetableQuestion {
  id: number;
  question: string;
  explanation: string;
  answers: IGetableAnswer[];
}
