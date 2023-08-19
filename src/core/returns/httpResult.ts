export class HttpResult {
  data: any
  statusCode: number

  constructor({ data, statusCode }: { data: any; statusCode: number }) {
    this.data = data
    this.statusCode = statusCode
  }
}
