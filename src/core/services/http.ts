import { BASE_URL, API_KEY } from '@env'
import { IHttp } from '../interfaces/http'
import { HttpResult } from '../returns/httpResult'
import axios from 'axios'

export class Http implements IHttp {
  service = axios.create({
    baseURL: BASE_URL,
  })

  async get(url: string): Promise<HttpResult> {
    const result = await this.service.get(`${url}?api_key=${API_KEY}&page=1`)

    return {
      data: JSON.parse(result.data),
      statusCode: result.status,
    }
  }
}
