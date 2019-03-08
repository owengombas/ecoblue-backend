import * as BodyParder from "koa-bodyparser";
import { createConnection } from "typeorm";
import { Rakkit } from "rakkit";
import * as Path from "path";
import { Timing } from "./class";

export class Main {
  private static _instance: Main;

  static get Instance() {
    if (this._instance) {
      this._instance = new Main();
    }
    return this._instance;
  }

  static async Start() {
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
    Timing.timer();
  }

  private static getGlob(pathEnd: string, cond: string) {
    const path = Path.resolve(__dirname, pathEnd);
    return `${path}/*${cond}.ts`;
  }
}

Main.Start();
