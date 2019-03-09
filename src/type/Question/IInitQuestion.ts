import { QuestionModel, AnswerModel } from "../../models";

export interface IInitQuestion {
  question: QuestionModel;
  answers: AnswerModel[];
}
