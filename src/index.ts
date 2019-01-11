import { Fetcher, Persister } from './class'

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

Main.Start(
  new Fetcher({
    baseUrl: 'http://api.readsan.com/api/manga',
    contentType: 'application/json',
    method: 'get'
  })
)

