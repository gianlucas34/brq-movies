import { IFailure } from '../interfaces/failure'

export class NoConnectionError implements IFailure {
  message: string
  type: 'Failure'

  constructor() {
    this.message = 'Não há conexão com a internet!'
    this.type = 'Failure'
  }
}

export class DatasourceError implements IFailure {
  message: string
  type: 'Failure'

  constructor() {
    this.message = 'Algo deu errado! Entre em contato com o suporte.'
    this.type = 'Failure'
  }
}

export class InternalError implements IFailure {
  message: string
  type: 'Failure'

  constructor() {
    this.message =
      'O servidor encontrou uma situação com a qual não sabe lidar!'
    this.type = 'Failure'
  }
}
