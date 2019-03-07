import { Service } from "rakkit";
import { Subject } from "rxjs";
import { HttpRequest, Timing } from "../class";

@Service()
export class FetcherService {
  private _requests: HttpRequest[];
  private _timer: NodeJS.Timeout;
  private _fetchSubject: Subject<Object> = new Subject();

  get FetchSubject() {
    return this._fetchSubject;
  }

  Start(...requests: HttpRequest[]) {
    this._requests = requests;
    this.launchUpdate();
  }

  Stop() {
    clearTimeout(this._timer);
  }

  private launchUpdate() {
    console.log("Update in: ", Timing.convertToMinutes(Timing.NextTimeRange));
    this._timer = setTimeout(
      this.execute.bind(this),
      Timing.NextTimeRange
    );
  }

  private async execute() {
    try {
      const res = await Promise.all(
        this._requests.map((request) => request.execute())
      );
      console.log("a", res);
      this._fetchSubject.next(res);
    } catch (err) {
      console.log(err);
      this._fetchSubject.error({
        message: "Request error",
        datas: this._requests.map((request) => request.Url)
      });
    }
    this.launchUpdate();
  }
}
