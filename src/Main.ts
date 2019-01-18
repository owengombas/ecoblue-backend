import { Fetcher, Persister, FunctionGenerator } from "@class";
import { nextThinkRequest } from "@constant";
import { IProbFunction } from "@type";

export class Main {
  private static _instance: Main;
  private _currentDay: IProbFunction;
  private _nextDay: IProbFunction;

  static get Instance() {
    if (this._instance) {
      this._instance = new Main();
    }
    return this._instance;
  }

  static Start(...fetchers: Fetcher[]) {
    fetchers.map((f) => {
      f.start();
      f.FetchSubject.subscribe(Persister.persist);
    });
    console.log(FunctionGenerator.generateDay(1));
    console.log((new Date).getDay());
    setTimeout(() => {

    }, FunctionGenerator.TimeToMidnight);
  }
}
console.log(FunctionGenerator.HourIndex);
Main.Start();
