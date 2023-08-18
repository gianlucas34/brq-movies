import { IFailure } from '../../../../core/interfaces/failure'
import { UserEntity } from '../../entities/UserEntity'

export interface ILoginRepository {
  login(): Promise<UserEntity | IFailure>
}
