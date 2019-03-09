"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Model_1 = require("../Model");
const ProbElementModel_1 = require("./ProbElementModel");
const class_1 = require("../../class");
let ProbModel = class ProbModel extends Model_1.Model {
    constructor() {
        super();
        this._date = class_1.Timing.today;
    }
    get Getable() {
        return {
            date: this.Date,
            values: this.Values.map((value) => value.Getable)
        };
    }
    get Date() {
        return this._date;
    }
    set Date(date) {
        this._date = date;
    }
    get Values() {
        return this._values;
    }
    set Values(values) {
        this._values = values;
    }
};
__decorate([
    typeorm_1.Column({
        unique: true,
        type: "datetime"
    }),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Object])
], ProbModel.prototype, "Date", null);
__decorate([
    typeorm_1.OneToMany(type => ProbElementModel_1.ProbElementModel, probElementModel => probElementModel.Prob, { cascade: true, eager: true }),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ProbModel.prototype, "Values", null);
ProbModel = __decorate([
    typeorm_1.Entity({
        name: "probs"
    }),
    __metadata("design:paramtypes", [])
], ProbModel);
exports.ProbModel = ProbModel;
//# sourceMappingURL=ProbModel.js.map