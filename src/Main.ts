import * as BodyParder from "koa-bodyparser";
import { Rakkit, MetadataStorage } from "rakkit";
import { ProbGeneratorService } from "./api/services/ProbGeneratorService";

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
        `${__dirname}/api/routers/*Router.ts`
      ]
    });
    MetadataStorage.getService(ProbGeneratorService).Start();
  }
}

Main.Start();
