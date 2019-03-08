import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";

export abstract class Model extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "id"
  })
  protected readonly _id: number;

  get Id() {
    return this._id;
  }
}
