import { HttpResult } from '../returns/httpResult'

export interface IHttp {
  get(url: string): Promise<HttpResult>
}
