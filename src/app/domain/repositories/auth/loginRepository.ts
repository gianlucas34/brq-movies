import { UserEntity } from '../../entities/UserEntity'
import { ICredentials } from '../../usecases/auth/loginUsecase'

export interface ILoginRepository {
  login(credentials: ICredentials): Promise<UserEntity | Error>
}
