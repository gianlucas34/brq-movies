export class HttpResult {
  data: Object | []
  statusCode: number

  constructor(data: any, statusCode: number) {
    this.data = data
    this.statusCode = statusCode
  }
}
