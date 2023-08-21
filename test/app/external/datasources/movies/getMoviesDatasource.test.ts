import { mock } from 'jest-mock-extended'
import { GetMoviesDatasource } from '../../../../../src/app/external/datasources/movies/getMoviesDatasource'
import { IHttp } from '../../../../../src/core/interfaces/http'
import { DatasourceError } from '../../../../../src/core/returns/errors'
import { mockedMovies } from '../../../../mocks/movies/mockedMovies'

describe('Get Movies Datasource', () => {
  const http = mock<IHttp>()
  const datasource = new GetMoviesDatasource({ http })

  it('Should return a MovieEntity[] if status code equal 200', async () => {
    http.get.mockResolvedValue({ data: mockedMovies, statusCode: 200 })

    const result = await datasource.getMovies()

    expect(result).toEqual(mockedMovies)
  })

  it('Should throw DatasourceError if status code different of 200', async () => {
    http.get.mockResolvedValue({ data: mockedMovies, statusCode: 500 })

    await expect(() => datasource.getMovies()).rejects.toThrow(DatasourceError)
  })
})
