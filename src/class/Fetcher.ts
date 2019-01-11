import Axios, { AxiosInstance } from 'axios'
import { IFetcherParams } from '../type'
import { Toolbox } from '.'
import { Subject } from 'rxjs'

export class Fetcher {
  private _timer: NodeJS.Timeout
  private _baseUrl: string
  private _method: string
  private _contentType: string
  private _cookies: Map<string, string>
  private _client: AxiosInstance
  private _interval: number = 0.1
  private _fetchSubject: Subject<Object> = new Subject()

  public get FetchSubject() {
    return this._fetchSubject
  }

  public get Client() {
    return this._client
  }

  public get BaseUrl() {
    return this._baseUrl
  }
  public set BaseUrl(val) {
    this.refreshClient({ baseUrl: val })
  }

  public get Method() {
    return this._method
  }
  public set Method(val) {
    this.refreshClient({ method: val })
  }

  public get ContentType() {
    return this._contentType
  }
  public set ContentType(val) {
    this.refreshClient({contentType: val})
  }

  public get Cookies() {
    return this._cookies
  }
  public set Cookies(val) {
    this._cookies = val
  }

  public constructor(params: IFetcherParams) {
    this.refreshClient(params)
  }

  private refreshClient(params: IFetcherParams) {
    this._client = Axios.create({
      baseURL: params.baseUrl || this._baseUrl,
      method: params.method || this._method,
      headers: {
        'Content-Type': params.contentType || this._contentType
      }
    })
    this._interval = params.interval || this._interval
  }

  public start() {
    this._timer = setInterval(async () => {
      try {
        this._fetchSubject.next((await this.Client({})).data)
      } catch (err) {
        this._fetchSubject.error({ message: 'Request error' })
      }
    }, Toolbox.getMinute(this._interval))
  }

  public stop() {
    clearInterval(this._timer)
  }
}
