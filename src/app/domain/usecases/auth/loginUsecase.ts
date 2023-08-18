import { IFailure } from '../../../../core/interfaces/failure'
import { IUseCase, INoParams } from '../../../../core/interfaces/usecase'
import { UserEntity } from '../../entities/UserEntity'
import { ILoginRepository } from '../../repositories/auth/loginRepository'

export class LoginUsecase
  implements IUseCase<UserEntity | IFailure, INoParams>
{
  repository: ILoginRepository

  constructor(repository: ILoginRepository) {
    this.repository = repository
  }

  async execute(): Promise<UserEntity | IFailure> {
    return await this.repository.login()
  }
}
