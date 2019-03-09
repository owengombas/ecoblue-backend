import {
  Entity,
  Column,
  ManyToOne,
  Index
} from "typeorm";
import { QuestionModel } from "./QuestionModel";
import { Model } from "../Model";
import { IGetableAnswer } from "../../type";

@Entity({
  name: "answers"
})
export class AnswerModel extends Model {
  private _text: string;
  private _votes: number;
  private _good: boolean;
  private _question: QuestionModel;

  get Getable(): IGetableAnswer {
    return {
      id: this.Id,
      good: this.Good,
      text: this.Text,
      votes: this.Votes
    };
  }

  constructor(text: string, good: boolean = false) {
    super();
    this.Text = text;
    this.Good = good;
    this.Votes = 0;
  }

  @Column()
  get Text(): string {
    return this._text;
  }
  set Text(text) {
    this._text = text;
  }

  @Column({
    default: 0
  })
  get Votes(): number {
    return this._votes;
  }
  set Votes(votes) {
    this._votes = votes;
  }

  @Column({
    default: false
  })
  get Good(): boolean {
    return this._good;
  }
  set Good(good) {
    this._good = good;
  }

  @ManyToOne(
    type => QuestionModel,
    questionModel => questionModel.Answers
  )
  get Question() {
    return this._question;
  }
  set Question(question) {
    this._question = question;
  }
}
