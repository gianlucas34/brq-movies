import { mock } from 'jest-mock-extended'
import { ILoginRepository } from '../../../../../src/app/domain/repositories/auth/loginRepository'
import { LoginUsecase } from '../../../../../src/app/domain/usecases/auth/loginUsecase'
import { NoConnectionError } from '../../../../../src/core/returns/errors'
import { mockedCredentials } from '../../../../mocks/auth/mockedCredentials'
import { mockedUser } from '../../../../mocks/auth/mockedUser'

describe('Login Usecase', () => {
  const repository = mock<ILoginRepository>()
  const usecase = new LoginUsecase({ repository })

  it('Should return a UserEntity', async () => {
    repository.login.mockResolvedValue(mockedUser)

    const result = await usecase.execute(mockedCredentials)

    expect(result).toEqual(mockedUser)
  })

  it('Should return Error', async () => {
    repository.login.mockResolvedValue(NoConnectionError)

    const result = await usecase.execute(mockedCredentials)

    expect(result).toEqual(NoConnectionError)
  })
})
