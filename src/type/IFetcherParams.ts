export interface IFetcherParams {
  url?: string
  method?: string
  contentType?: string
  cookies?: Map<string, string>
  interval?: number,
  headers?: Object,
  data?: any
}
