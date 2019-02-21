import { Subject } from "rxjs";
import { Toolbox, HttpRequest } from "..";

export class Fetcher {
  private _requests: HttpRequest[];
  private _timer: NodeJS.Timeout;
  private _interval: number = 1;
  private _fetchSubject: Subject<Object> = new Subject();

  public get FetchSubject() {
    return this._fetchSubject;
  }

  public constructor(requests: HttpRequest[])
  public constructor(requests: HttpRequest[], interval: number)
  public constructor(requests: HttpRequest[], interval?: number) {
    this._requests = requests;
    if (this._interval) {
      this._interval = interval;
    }
  }

  public start() {
    this._timer = setTimeout(
      this.execute.bind(this),
      Toolbox.getMinute(this._interval)
    );
  }

  private async execute() {
    try {
      const res = await Promise.all(
        this._requests.map((request) => request.execute())
      );
      this._fetchSubject.next(res);
    } catch (err) {
      console.log(err);
      this._fetchSubject.error({
        message: "Request error",
        datas: this._requests.map((request) => request.Url)
      });
    }
    this.start();
  }

  public stop() {
    clearTimeout(this._timer);
  }
}
