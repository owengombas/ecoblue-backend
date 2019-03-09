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
const QuestionModel_1 = require("./QuestionModel");
const Model_1 = require("../Model");
let AnswerModel = class AnswerModel extends Model_1.Model {
    constructor(text, good = false) {
        super();
        this.Text = text;
        this.Good = good;
        this.Votes = 0;
    }
    get Getable() {
        return {
            id: this.Id,
            good: this.Good,
            text: this.Text,
            votes: this.Votes
        };
    }
    get Text() {
        return this._text;
    }
    set Text(text) {
        this._text = text;
    }
    get Votes() {
        return this._votes;
    }
    set Votes(votes) {
        this._votes = votes;
    }
    get Good() {
        return this._good;
    }
    set Good(good) {
        this._good = good;
    }
    get Question() {
        return this._question;
    }
    set Question(question) {
        this._question = question;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [Object])
], AnswerModel.prototype, "Text", null);
__decorate([
    typeorm_1.Column({
        default: 0
    }),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Object])
], AnswerModel.prototype, "Votes", null);
__decorate([
    typeorm_1.Column({
        default: false
    }),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Object])
], AnswerModel.prototype, "Good", null);
__decorate([
    typeorm_1.ManyToOne(type => QuestionModel_1.QuestionModel, questionModel => questionModel.Answers),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AnswerModel.prototype, "Question", null);
AnswerModel = __decorate([
    typeorm_1.Entity({
        name: "answers"
    }),
    __metadata("design:paramtypes", [String, Boolean])
], AnswerModel);
exports.AnswerModel = AnswerModel;
//# sourceMappingURL=AnswerModel.js.map