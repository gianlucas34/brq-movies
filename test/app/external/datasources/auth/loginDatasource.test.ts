import { LoginDatasource } from '../../../../../src/app/external/datasources/auth/loginDatasource'
import { DatasourceError } from '../../../../../src/core/returns/errors'
import {
  mockedCredentials,
  mockedOtherCredentials,
} from '../../../../mocks/auth/mockedCredentials'
import { mockedUser } from '../../../../mocks/auth/mockedUser'

describe('Login Datasource', () => {
  const datasource = new LoginDatasource()

  it('Should return a UserEntity if user = user and password = 123', async () => {
    const result = await datasource.login(mockedCredentials)

    expect(result).toEqual(mockedUser)
  })

  it('Should throw DatasourceError if user !== user or password !== 123', async () => {
    await expect(() =>
      datasource.login(mockedOtherCredentials)
    ).rejects.toThrow(DatasourceError)
  })
})
