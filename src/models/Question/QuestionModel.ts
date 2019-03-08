import {
  Entity,
  OneToMany,
  Column
} from "typeorm";
import { AnswerModel } from "./AnswerModel";
import { Model } from "../Model";
import { IGetableQuestion } from "../../type";

@Entity({
  name: "questions"
})
export class QuestionModel extends Model {
  private _answers: AnswerModel[];
  private _question: string;

  get Getable(): IGetableQuestion {
    return {
      id: this.Id,
      question: this._question,
      answers: this._answers.map((answer) => answer.Getable)
    };
  }

  @OneToMany(
    type => AnswerModel,
    responseModel => responseModel.Question,
    { cascade: true, eager: true }
  )
  get Answers() {
    return this._answers;
  }
  set Answers(answers) {
    this._answers = answers;
  }

  @Column()
  get Question(): string {
    return this._question;
  }
  set Question(question) {
    this._question = question;
  }
}
