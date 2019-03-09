"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BodyParder = require("koa-bodyparser");
const typeorm_1 = require("typeorm");
const rakkit_1 = require("rakkit");
const Path = require("path");
const class_1 = require("./class");
const constant_1 = require("./constant");
class Main {
    constructor() {
        this.initQuestions = true;
    }
    static get Instance() {
        if (!this._instance) {
            this._instance = new Main();
        }
        return this._instance;
    }
    static Start() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Instance.start();
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield rakkit_1.Rakkit.start({
                globalRestMiddlewares: [
                    BodyParder()
                ],
                routers: [
                    this.getGlob("routers/**", "Router")
                ]
            });
            yield typeorm_1.createConnection({
                username: "root",
                password: "root",
                database: "nirvana",
                synchronize: true,
                type: "mysql",
                entities: [
                    this.getGlob("models/**", "Model")
                ]
            });
            if (this.initQuestions) {
                yield Promise.all(constant_1.questions.map((question) => __awaiter(this, void 0, void 0, function* () {
                    question.question.Answers = question.answers.map((answer) => {
                        answer.Question = question.question;
                        return answer;
                    });
                    return yield question.question.save();
                })));
            }
            class_1.Timing.timer();
        });
    }
    getGlob(pathEnd, cond) {
        const path = Path.resolve(__dirname, pathEnd);
        return `${path}/*${cond}.{js,ts}`;
    }
}
exports.Main = Main;
Main.Start();
//# sourceMappingURL=Main.js.map