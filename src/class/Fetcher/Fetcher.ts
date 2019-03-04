import { Subject } from "rxjs";
import { Toolbox, HttpRequest } from "..";

export class Fetcher {
  private _requests: HttpRequest[];
  private _timer: NodeJS.Timeout;
  private _interval: number = 1;
  private _fetchSubject: Subject<Object> = new Subject();

  get FetchSubject() {
    return this._fetchSubject;
  }

  constructor(requests: HttpRequest[])
  constructor(requests: HttpRequest[], interval: number)
  constructor(requests: HttpRequest[], interval?: number) {
    this._requests = requests;
    if (this._interval) {
      this._interval = interval;
    }
  }

  start() {
    this._timer = setTimeout(
      this.execute.bind(this),
      Toolbox.getMinute(this._interval)
    );
  }

  stop() {
    clearTimeout(this._timer);
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
}
