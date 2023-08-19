import { LoginDatasource } from '../../../../../src/app/external/datasources/auth/loginDatasource'
import { DatasourceError } from '../../../../../src/core/returns/errors'
import {
  credentials,
  otherCredentials,
} from '../../../../mocks/auth/credentials'
import { mockedResult } from '../../../../mocks/auth/mockedResult'

describe('Login Datasource', () => {
  const datasource = new LoginDatasource()

  it('Should return a UserEntity if user = user and password = 123', async () => {
    const result = await datasource.login(credentials)

    expect(result).toEqual(mockedResult)
  })

  it('Should throw DatasourceError if user !== user or password !== 123', async () => {
    await expect(() => datasource.login(otherCredentials)).rejects.toThrow(
      DatasourceError
    )
  })
})
