import { Service } from "rakkit";
import { Subject } from "rxjs";
import { HttpRequest, Timing } from "../class";
import { FetchModel } from "../models";
import { AxiosResponse } from "axios";
import { nextThinkRequest } from "../constant";

@Service()
export class FetcherService {
  private _requests: HttpRequest[];
  private _fetchSubject: Subject<Object> = new Subject();

  get FetchSubject() {
    return this._fetchSubject;
  }

  constructor() {
    this._requests = [
      nextThinkRequest()
    ];
    // Timing.tickSubject.subscribe(
    //   this.execute.bind(this)
    // );
  }

  private async execute() {
    try {
      const allRes = await Promise.all<AxiosResponse>(
        this._requests.map((request) => request.execute())
      );
      allRes.map(async (res) => {
        if (res.data) {
          const fetch = new FetchModel(res.data);
          await fetch.save();
          this._fetchSubject.next(res);
        }
      });
    } catch (err) {
      console.log(err);
      this._fetchSubject.error({
        message: "Request error",
        datas: this._requests.map((request) => request.Url)
      });
    }
  }
}
