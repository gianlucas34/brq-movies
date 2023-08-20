import { LoginDatasource } from '../../../../../src/app/external/datasources/auth/loginDatasource'
import { LoginError } from '../../../../../src/core/returns/errors'
import {
  mockedCredentials,
  mockedOtherCredentials,
} from '../../../../mocks/auth/mockedCredentials'
import { mockedUser } from '../../../../mocks/auth/mockedUser'

describe('Login Datasource', () => {
  const datasource = new LoginDatasource()

  it('Should return a UserEntity if user credentials are correct', async () => {
    const result = await datasource.login(mockedCredentials)

    expect(result).toEqual(mockedUser)
  })

  it('Should throw LoginError if user credentials are incorrect', async () => {
    await expect(() =>
      datasource.login(mockedOtherCredentials)
    ).rejects.toThrow(LoginError)
  })
})
