import * as BodyParder from "koa-bodyparser";
import { Rakkit, MetadataStorage } from "rakkit";
import { ProbGeneratorService, FetcherService } from "./services";
import { nextThinkRequest } from "./constant";

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
    MetadataStorage.getService(ProbGeneratorService).Start();
    MetadataStorage.getService(FetcherService).Start(nextThinkRequest());
  }
}

Main.Start();
