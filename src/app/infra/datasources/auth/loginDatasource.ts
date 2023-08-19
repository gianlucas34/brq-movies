import { UserEntity } from '../../../domain/entities/UserEntity'
import { ICredentials } from '../../../domain/usecases/auth/loginUsecase'

export interface ILoginDatasource {
  login(credentials: ICredentials): Promise<UserEntity | Error>
}
