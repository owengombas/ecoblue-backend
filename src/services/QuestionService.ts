import { Service } from "rakkit";
import { QuestionModel } from "../models";

@Service()
export class QuestionService {
  private _questions: QuestionModel[];

  async getQuestions() {
    if (!this._questions) {
      this._questions = await QuestionModel.find();
    }
    return this._questions.map((question) => question.Getable);
  }

  async AddAnswer(questionIndex: number, answerIndex: number) {
    await this.getQuestions();
    const question = this._questions[questionIndex];
    if (question) {
      const answer = question.Answers[answerIndex];
      if (answer) {
        answer.Votes++;
        await answer.save();
        return answer.Getable;
      }
    }
    return undefined;
  }
}
