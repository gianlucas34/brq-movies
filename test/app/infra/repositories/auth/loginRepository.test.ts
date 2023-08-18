import { mock } from 'jest-mock-extended'
import { LoginRepository } from '../../../../../src/app/infra/repositories/auth/loginRepository'
import { ILoginDatasource } from '../../../../../src/app/infra/datasources/auth/loginDatasource'
import { INetworkInfo } from '../../../../../src/core/interfaces/networkInfo'
import { UserModel } from '../../../../../src/app/infra/models/UserModel'
import {
  DatasourceError,
  InternalError,
  NoConnectionError,
} from '../../../../../src/core/returns/errors'

describe('Login Repository', () => {
  const datasource = mock<ILoginDatasource>()
  const networkInfo = mock<INetworkInfo>()
  const repository = new LoginRepository(datasource, networkInfo)

  beforeEach(() => {
    datasource.login.mockReset()
  })

  it('Should return a UserModel if user network is connected', async () => {
    networkInfo.isConnected.mockResolvedValue(true)
    datasource.login.mockResolvedValue(mockedResult)

    const result = await repository.login()

    expect(result).toEqual(mockedResult)
  })

  it('Should return a DatasourceError if user network is connected but datasource failed', async () => {
    networkInfo.isConnected.mockResolvedValue(true)
    datasource.login.mockRejectedValue(new DatasourceError())

    const result = await repository.login()

    expect(result).toEqual(new DatasourceError())
  })

  it('Should return a InternalError if user network is connected but the error is not of type Failure', async () => {
    networkInfo.isConnected.mockResolvedValue(true)
    datasource.login.mockRejectedValue(new Error())

    const result = await repository.login()

    expect(result).toEqual(new InternalError())
  })

  it('Should return a NoConnectionError if user network is disconnected', async () => {
    networkInfo.isConnected.mockResolvedValue(false)

    const result = await repository.login()

    expect(datasource.login).not.toHaveBeenCalled()
    expect(result).toEqual(new NoConnectionError())
  })
})

const mockedResult = new UserModel({
  name: 'Gian',
  token: new Date().getTime().toString(),
})
