import { mock } from 'jest-mock-extended'
import { LoginRepository } from '../../../../../src/app/infra/repositories/auth/loginRepository'
import { ILoginDatasource } from '../../../../../src/app/infra/datasources/auth/loginDatasource'
import { INetworkInfo } from '../../../../../src/core/interfaces/networkInfo'
import {
  LoginError,
  InternalError,
  NoConnectionError,
} from '../../../../../src/core/returns/errors'
import {
  mockedCredentials,
  mockedOtherCredentials,
} from '../../../../mocks/auth/mockedCredentials'
import { mockedUser } from '../../../../mocks/auth/mockedUser'

describe('Login Repository', () => {
  const datasource = mock<ILoginDatasource>()
  const networkInfo = mock<INetworkInfo>()
  const repository = new LoginRepository({ datasource, networkInfo })

  beforeEach(() => {
    datasource.login.mockReset()
  })

  it('Should return a UserEntity if user network is connected', async () => {
    networkInfo.isConnected.mockResolvedValue(true)
    datasource.login.mockResolvedValue(mockedUser)

    const result = await repository.login(mockedCredentials)

    expect(result).toEqual(mockedUser)
  })

  it('Should return a LoginError if user network is connected but user credentials are incorrect', async () => {
    networkInfo.isConnected.mockResolvedValue(true)
    datasource.login.mockRejectedValue(LoginError)

    const result = await repository.login(mockedOtherCredentials)

    expect(result).toEqual(LoginError)
  })

  it('Should return a InternalError if user network is connected but the error is not of type Failure', async () => {
    networkInfo.isConnected.mockResolvedValue(true)
    datasource.login.mockRejectedValue(new Error())

    const result = await repository.login(mockedCredentials)

    expect(result).toEqual(InternalError)
  })

  it('Should return a NoConnectionError if user network is disconnected', async () => {
    networkInfo.isConnected.mockResolvedValue(false)

    const result = await repository.login(mockedCredentials)

    expect(datasource.login).not.toHaveBeenCalled()
    expect(result).toEqual(NoConnectionError)
  })
})
