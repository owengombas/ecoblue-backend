import { IFetcherParams } from '../type'
import Axios from 'axios'

export class HttpRequest {
  private _url: string
  private _method: string
  private _contentType: string
  private _cookies: Map<string, string> = new Map()
  private _data: any
  private _headers: Object

  public get Data() {
    return this._data
  }
  public set Data(data) {
    this._data = data
  }

  public get Url() {
    return this._url
  }
  public set Url(url) {
    this._url = url
  }

  public get Method() {
    return this._method
  }
  public set Method(method) {
    this._method = method
  }

  public get ContentType() {
    return this._contentType
  }
  public set ContentType(contentType) {
    this._contentType = contentType
  }

  public get Cookies() {
    return this._cookies
  }
  public set Cookies(val) {
    this._cookies = val
  }

  public get Headers() {
    return this._headers
  }
  public set Headers(headers) {
    this._headers = headers
  }

  /**
   * Flat the cookies to put it into the headers
   */
  public get FlatCookies() {
    if (this._cookies) {
      return Array.from(this._cookies).reduce((prev: string, curr: string[], index: number) => {
        return `${prev}${index > 0 ? ';' : ''}${curr[0]}=${curr[1]}`
      }, '')
    }
    return ''
  }

  public constructor(params: IFetcherParams) {
    this.Data = params.data
    this.Cookies = params.cookies
    this.ContentType = params.contentType
    this.Url = params.url
    this.Method = params.method
    this.Headers = params.header
  }

  /**
   * Execute the HTTP request
   */
  public async execute() {
    const res = await Axios(this.Url, {
      method: this.Method,
      data: this.Data,
      headers: {
        'Content-Type': this.ContentType,
        'Cookie': this.FlatCookies,
        ...this.Headers
      }
    })
    return res.data
  }
}
