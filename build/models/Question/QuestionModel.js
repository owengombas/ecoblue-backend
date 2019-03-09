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
const AnswerModel_1 = require("./AnswerModel");
const Model_1 = require("../Model");
let QuestionModel = class QuestionModel extends Model_1.Model {
    constructor(question, explanation) {
        super();
        this.Question = question;
        this.Explanation = explanation;
    }
    get Getable() {
        return {
            id: this.Id,
            question: this._question,
            explanation: this._explanation,
            answers: this._answers.map((answer) => answer.Getable)
        };
    }
    get Answers() {
        return this._answers;
    }
    set Answers(answers) {
        this._answers = answers;
    }
    get Question() {
        return this._question;
    }
    set Question(question) {
        this._question = question;
    }
    get Explanation() {
        return this._explanation;
    }
    set Explanation(explanation) {
        this._explanation = explanation;
    }
};
__decorate([
    typeorm_1.OneToMany(type => AnswerModel_1.AnswerModel, responseModel => responseModel.Question, { cascade: true, eager: true }),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], QuestionModel.prototype, "Answers", null);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [Object])
], QuestionModel.prototype, "Question", null);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [Object])
], QuestionModel.prototype, "Explanation", null);
QuestionModel = __decorate([
    typeorm_1.Entity({
        name: "questions"
    }),
    __metadata("design:paramtypes", [String, String])
], QuestionModel);
exports.QuestionModel = QuestionModel;
//# sourceMappingURL=QuestionModel.js.map