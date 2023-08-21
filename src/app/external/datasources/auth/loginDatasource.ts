import { LoginError } from '../../../../core/returns/errors'
import { UserEntity } from '../../../domain/entities/UserEntity'
import { ICredentials } from '../../../domain/usecases/auth/loginUsecase'
import { ILoginDatasource } from '../../../infra/datasources/auth/loginDatasource'
import { UserModel } from '../../../infra/models/UserModel'

export class LoginDatasource implements ILoginDatasource {
  async login({ user, password }: ICredentials): Promise<UserEntity | Error> {
    if (user === 'user' && password === '123') {
      return new UserModel({
        name: 'Gian',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      }).fromJson()
    } else {
      throw LoginError
    }
  }
}
