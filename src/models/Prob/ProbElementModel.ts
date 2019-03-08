import { Entity, Column, ManyToOne } from "typeorm";
import { IGetableProbElement } from "../../type";
import { ProbModel } from "./ProbModel";
import { Model } from "../Model";

@Entity({
  name: "probElements"
})
export class ProbElementModel extends Model {
  private _index: number;
  private _slope: number;
  private _value: number;
  private _prob?: ProbModel;

  constructor(index: number, slope: number, value: number) {
    super();
    this.Index = index;
    this.Slope = slope;
    this.Value = value;
  }

  get Getable(): IGetableProbElement {
    return {
      index: this.Index,
      slope: this.Slope,
      value: this.Value
    };
  }

  @Column()
  get Index(): number {
    return this._index;
  }
  set Index(index) {
    this._index = index;
  }

  @Column()
  get Slope(): number {
    return this._slope;
  }
  set Slope(slope) {
    this._slope = slope;
  }

  @Column()
  get Value(): number {
    return this._value;
  }
  set Value(value) {
    this._value = value;
  }

  @ManyToOne(
    type => ProbModel,
    probModel => probModel.Values
  )
  get Prob(): ProbModel | undefined {
    return this._prob;
  }
  set Prob(prob) {
    this._prob = prob;
  }
}
