import { Fetcher, Persister } from "@class";
import { nextThinkRequest } from "@constant";
import { FunctionGenerator } from "./class/Prob/FunctionGenerator";

export class Main {
  private static _instance: Main;

  public static get Instance() {
    if (this._instance) {
      this._instance = new Main();
    }
    return this._instance;
  }

  public static Start(...fetchers: Fetcher[]) {
    fetchers.map((f) => {
      f.start();
      f.FetchSubject.subscribe(Persister.persist);
    });
  }
}

FunctionGenerator.generateDay(1);
Main.Start();
