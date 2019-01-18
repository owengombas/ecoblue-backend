import { Agent } from "https";
import Axios from "axios";
import { IFetcherParams } from "@type";

export class HttpRequest {
  private _url: string;
  private _method: string;
  private _contentType: string;
  private _cookies: Map<string, string> = new Map();
  private _data: any;
  private _headers: Object;

  get Data() {
    return this._data;
  }
  set Data(data) {
    this._data = data;
  }

  get Url() {
    return this._url;
  }
  set Url(url) {
    this._url = url;
  }

  get Method() {
    return this._method;
  }
  set Method(method) {
    this._method = method;
  }

  get ContentType() {
    return this._contentType;
  }
  set ContentType(contentType) {
    this._contentType = contentType;
  }

  get Cookies() {
    return this._cookies;
  }
  set Cookies(val) {
    this._cookies = val;
  }

  get Headers() {
    return this._headers;
  }
  set Headers(headers) {
    this._headers = headers;
  }

  /**
   * Flat the cookies to put it into the headers
   */
  get FlatCookies() {
    if (this._cookies) {
      return Array.from(this._cookies).reduce((prev: string, curr: string[], index: number) => {
        return `${prev}${index > 0 ? ";" : ""}${curr[0]}=${curr[1]}`;
      },                                      "");
    }
    return "";
  }

  constructor(params: IFetcherParams) {
    this.Data = params.data;
    this.Cookies = params.cookies;
    this.ContentType = params.contentType;
    this.Url = params.url;
    this.Method = params.method;
    this.Headers = params.headers;
  }

  /**
   * Execute the HTTP request
   */
  async execute() {
    const res = await Axios(this.Url, {
      method: this.Method,
      data: this.Data,
      httpsAgent: new Agent({
        rejectUnauthorized: false
      }),
      headers: {
        "Content-Type": this.ContentType,
        Cookie: this.FlatCookies,
        ...this.Headers
      }
    });
    return res.data;
  }
}
