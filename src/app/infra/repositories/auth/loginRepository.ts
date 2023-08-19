import { INetworkInfo } from '../../../../core/interfaces/networkInfo'
import {
  InternalError,
  NoConnectionError,
} from '../../../../core/returns/errors'
import { UserEntity } from '../../../domain/entities/UserEntity'
import { ILoginRepository } from '../../../domain/repositories/auth/loginRepository'
import { ICredentials } from '../../../domain/usecases/auth/loginUsecase'
import { ILoginDatasource } from '../../datasources/auth/loginDatasource'

export class LoginRepository implements ILoginRepository {
  datasource: ILoginDatasource
  networkInfo: INetworkInfo

  constructor({
    datasource,
    networkInfo,
  }: {
    datasource: ILoginDatasource
    networkInfo: INetworkInfo
  }) {
    this.datasource = datasource
    this.networkInfo = networkInfo
  }

  async login(credentials: ICredentials): Promise<UserEntity | Error> {
    const isConnected = await this.networkInfo.isConnected()

    if (typeof isConnected === 'boolean' && isConnected) {
      try {
        return await this.datasource.login(credentials)
      } catch (error: any) {
        const isCustomError = error?.cause
          ? error.cause === 'CustomError'
          : false

        if (isCustomError) {
          return error
        } else {
          return InternalError
        }
      }
    } else {
      return NoConnectionError
    }
  }
}
