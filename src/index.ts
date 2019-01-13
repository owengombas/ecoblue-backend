import { Fetcher, Persister, HttpRequest, Datacenter } from './class'
import { nextThinkRequest } from './constant/Requests'
import { writeFile } from 'fs'

export class Main {
  private static _instance: Main

  public static get Instance() {
    if (this._instance) {
      this._instance = new Main()
    }
    return this._instance
  }

  public static Start(...fetchers: Fetcher[]) {
    fetchers.map((f) => {
      f.start()
      f.FetchSubject.subscribe(Persister.persist)
    })
  }
}

// Main.Start(
//   new Fetcher([
//     nextThinkRequest()
//   ], 0.09)
// )

Datacenter.probHour()
Datacenter.probReccurence()
