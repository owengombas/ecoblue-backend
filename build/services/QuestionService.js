"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rakkit_1 = require("rakkit");
const models_1 = require("../models");
let QuestionService = class QuestionService {
    getQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._questions) {
                this._questions = yield models_1.QuestionModel.find();
            }
            return this._questions.map((question) => question.Getable);
        });
    }
    AddAnswer(questionIndex, answerIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getQuestions();
            const question = this._questions[questionIndex];
            if (question) {
                const answer = question.Answers[answerIndex];
                if (answer) {
                    answer.Votes++;
                    yield answer.save();
                    return answer.Getable;
                }
            }
            return undefined;
        });
    }
};
QuestionService = __decorate([
    rakkit_1.Service()
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=QuestionService.js.map