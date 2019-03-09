import { Column, Entity, OneToMany } from "typeorm";
import { Model } from "../Model";
import { ProbElementModel } from "./ProbElementModel";
import { Timing } from "../../class";
import { IGetableProb } from "../../type";

@Entity({
  name: "probs"
})
export class ProbModel extends Model {
  private _date: Date;
  private _values: ProbElementModel[];

  constructor() {
    super();
    this._date = Timing.today;
  }

  get Getable(): IGetableProb {
    return {
      date: this.Date,
      values: this.Values.map((value) => value.Getable)
    };
  }

  @Column({
    unique: true,
    type: "datetime"
  })
  get Date(): Date {
    return this._date;
  }
  set Date(date) {
    this._date = date;
  }

  @OneToMany(
    type => ProbElementModel,
    probElementModel => probElementModel.Prob,
    { cascade: true, eager: true }
  )
  get Values(): ReadonlyArray<ProbElementModel> {
    return this._values as ReadonlyArray<ProbElementModel>;
  }
  set Values(values) {
    this._values = (values as ProbElementModel[]);
  }
}
