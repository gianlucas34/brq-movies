import { mock } from 'jest-mock-extended'
import { ILoginRepository } from '../../../../../src/app/domain/repositories/auth/loginRepository'
import { LoginUsecase } from '../../../../../src/app/domain/usecases/auth/loginUsecase'
import { UserEntity } from '../../../../../src/app/domain/entities/UserEntity'
import { NoConnectionError } from '../../../../../src/core/returns/errors'

describe('Login Usecase', () => {
  const repository = mock<ILoginRepository>()
  const usecase = new LoginUsecase(repository)

  it('Should return a UserEntity', async () => {
    repository.login.mockResolvedValue(mockedResult)

    const result = await usecase.execute()

    expect(result).toEqual(mockedResult)
  })

  it('Should return a Failure', async () => {
    repository.login.mockResolvedValue(new NoConnectionError())

    const result = await usecase.execute()

    expect(result).toEqual(new NoConnectionError())
  })
})

const mockedResult: UserEntity = {
  name: 'Gian',
  token: new Date().getTime().toString(),
}
