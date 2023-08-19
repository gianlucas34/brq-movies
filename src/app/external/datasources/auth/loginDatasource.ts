import { DatasourceError } from '../../../../core/returns/errors'
import { UserEntity } from '../../../domain/entities/UserEntity'
import { ICredentials } from '../../../domain/usecases/auth/loginUsecase'
import { ILoginDatasource } from '../../../infra/datasources/auth/loginDatasource'
import { UserModel } from '../../../infra/models/UserModel'

export class LoginDatasource implements ILoginDatasource {
  async login({ user, password }: ICredentials): Promise<UserEntity | Error> {
    return new Promise((resolve, reject) => {
      if (user === 'user' && password === '123') {
        return resolve(
          new UserModel({
            name: 'Gian',
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          }).fromJson()
        )
      } else {
        throw reject(DatasourceError)
      }
    })
  }
}
