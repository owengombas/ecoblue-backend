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
const ProbModel_1 = require("./ProbModel");
const Model_1 = require("../Model");
let ProbElementModel = class ProbElementModel extends Model_1.Model {
    constructor(index, slope, value) {
        super();
        this.Index = index;
        this.Slope = slope;
        this.Value = value;
    }
    get Getable() {
        return {
            index: this.Index,
            slope: this.Slope,
            value: this.Value
        };
    }
    get Index() {
        return this._index;
    }
    set Index(index) {
        this._index = index;
    }
    get Slope() {
        return this._slope;
    }
    set Slope(slope) {
        this._slope = slope;
    }
    get Value() {
        return this._value;
    }
    set Value(value) {
        this._value = value;
    }
    get Prob() {
        return this._prob;
    }
    set Prob(prob) {
        this._prob = prob;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Object])
], ProbElementModel.prototype, "Index", null);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Object])
], ProbElementModel.prototype, "Slope", null);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Object])
], ProbElementModel.prototype, "Value", null);
__decorate([
    typeorm_1.ManyToOne(type => ProbModel_1.ProbModel, probModel => probModel.Values),
    __metadata("design:type", ProbModel_1.ProbModel),
    __metadata("design:paramtypes", [Object])
], ProbElementModel.prototype, "Prob", null);
ProbElementModel = __decorate([
    typeorm_1.Entity({
        name: "probElements"
    }),
    __metadata("design:paramtypes", [Number, Number, Number])
], ProbElementModel);
exports.ProbElementModel = ProbElementModel;
//# sourceMappingURL=ProbElementModel.js.map