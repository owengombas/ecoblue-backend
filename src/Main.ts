import * as BodyParder from "koa-bodyparser";
import { createConnection } from "typeorm";
import { Rakkit } from "rakkit";
import * as Path from "path";
import { Timing } from "./class";
import { questions } from "./constant";

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
      globalRestMiddlewares: [
        BodyParder()
      ],
      routers: [
        `${__dirname}/routers/*Router.ts`
      ]
    });
    await createConnection({
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
    return `${path}/*${cond}.ts`;
  }
}

Main.Start();
