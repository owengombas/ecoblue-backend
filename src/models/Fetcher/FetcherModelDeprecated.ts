import { Column, Entity } from "typeorm";
import { Model } from "../Model";

@Entity({
  name: "fetchs"
})
export class FetchModel extends Model {
  @Column({
    name: "date",
    type: "date"
  })
  private _date: Date;

  @Column({
    name: "date",
    type: "json"
  })
  private _value: Object;

  constructor(value: Object) {
    super();
    this._date = new Date();
    this._value = value;
  }

  get Date() {
    return this._date;
  }
  set Date(date) {
    this._date = date;
  }

  get Value() {
    return this._value;
  }
  set Value(value) {
    this._value = value;
  }
}
