import * as BodyParder from "koa-bodyparser";
import { createConnection } from "typeorm";
import * as Cors from "@koa/cors";
import { Rakkit } from "rakkit";
import * as Path from "path";
import { OptionsMiddleware } from "./middlewares";
import { questions } from "./constant";
import { Timing } from "./class";
import { QuestionModel } from "./models";

export class Main {
  private static _instance: Main;
  private initQuestions: boolean = true;

  static get Instance() {
    if (!this._instance) {
      this._instance = new Main();
    }
    return this._instance;
  }

  static async Start() {
    return this.Instance.start();
  }

  private async start() {
    await Rakkit.start({
      appMiddlewares: [
        Cors(),
        OptionsMiddleware
      ],
      globalRestMiddlewares: [
        BodyParder()
      ],
      routers: [
        this.getGlob("routers/**", "Router")
      ]
    });

    await createConnection({
      username: "root",
      password: "MelekMarteau593+",
      database: "nirvana",
      synchronize: false,
      type: "mysql",
      entities: [
        this.getGlob("models/**", "Model")
      ]
    });
    if (this.initQuestions) {
      await QuestionModel.clear();
      await Promise.all(
        questions.map(async (question) => {
          question.question.Answers = question.answers.map((answer) => {
            answer.Question = question.question;
            return answer;
          });
          return await question.question.save();
        })
      );
    }
    Timing.timer();
  }

  private getGlob(pathEnd: string, cond: string) {
    const path = Path.resolve(__dirname, pathEnd);
    return `${path}/*${cond}.{js,ts}`;
  }
}

Main.Start();
