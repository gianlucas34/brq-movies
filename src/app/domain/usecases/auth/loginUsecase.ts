import { IUseCase } from '../../../../core/interfaces/usecase'
import { UserEntity } from '../../entities/UserEntity'
import { ILoginRepository } from '../../repositories/auth/loginRepository'

export interface ICredentials {
  user: string
  password: string
}

export class LoginUsecase
  implements IUseCase<UserEntity | Error, ICredentials>
{
  repository: ILoginRepository

  constructor({ repository }: { repository: ILoginRepository }) {
    this.repository = repository
  }

  async execute(credentials: ICredentials): Promise<UserEntity | Error> {
    return await this.repository.login(credentials)
  }
}
