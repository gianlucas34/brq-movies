import { IFailure } from '../../../../core/interfaces/failure'
import { INetworkInfo } from '../../../../core/interfaces/networkInfo'
import {
  InternalError,
  NoConnectionError,
} from '../../../../core/returns/errors'
import { UserEntity } from '../../../domain/entities/UserEntity'
import { ILoginRepository } from '../../../domain/repositories/auth/loginRepository'
import { ILoginDatasource } from '../../datasources/auth/loginDatasource'

export class LoginRepository implements ILoginRepository {
  datasource: ILoginDatasource
  networkInfo: INetworkInfo

  constructor(datasource: ILoginDatasource, networkInfo: INetworkInfo) {
    this.datasource = datasource
    this.networkInfo = networkInfo
  }

  async login(): Promise<UserEntity | IFailure> {
    const isConnected = await this.networkInfo.isConnected()

    if (typeof isConnected === 'boolean' && isConnected) {
      try {
        return await this.datasource.login()
      } catch (error: any) {
        if ('type' in error && error.type === 'Failure') {
          return error
        } else {
          return new InternalError()
        }
      }
    } else {
      return new NoConnectionError()
    }
  }
}
