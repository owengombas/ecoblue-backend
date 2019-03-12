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
  private _explanation: string;

  get Getable(): IGetableQuestion {
    return {
      id: this.Id,
      question: this._question,
      explanation: this._explanation,
      answers: this._answers.map((answer) => answer.Getable)
    };
  }

  constructor(
    question: string,
    explanation: string
  ) {
    super();
    this.Question = question;
    this.Explanation = explanation;
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

  @Column({
    type: "text"
  })
  get Explanation(): string {
    return this._explanation;
  }
  set Explanation(explanation) {
    this._explanation = explanation;
  }
}
