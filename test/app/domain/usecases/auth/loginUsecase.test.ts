import { mock } from 'jest-mock-extended'
import { ILoginRepository } from '../../../../../src/app/domain/repositories/auth/loginRepository'
import { LoginUsecase } from '../../../../../src/app/domain/usecases/auth/loginUsecase'
import { NoConnectionError } from '../../../../../src/core/returns/errors'
import { credentials } from '../../../../mocks/auth/credentials'
import { mockedResult } from '../../../../mocks/auth/mockedResult'

describe('Login Usecase', () => {
  const repository = mock<ILoginRepository>()
  const usecase = new LoginUsecase({ repository })

  it('Should return a UserEntity', async () => {
    repository.login.mockResolvedValue(mockedResult)

    const result = await usecase.execute(credentials)

    expect(result).toEqual(mockedResult)
  })

  it('Should return a Failure', async () => {
    repository.login.mockResolvedValue(NoConnectionError)

    const result = await usecase.execute(credentials)

    expect(result).toEqual(NoConnectionError)
  })
})
