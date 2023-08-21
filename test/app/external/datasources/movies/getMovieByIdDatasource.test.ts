import { mock } from 'jest-mock-extended'
import { IHttp } from '../../../../../src/core/interfaces/http'
import { DatasourceError } from '../../../../../src/core/returns/errors'
import { mockedMovie } from '../../../../mocks/movies/mockedMovie'
import { GetMovieByIdDatasource } from '../../../../../src/app/external/datasources/movies/getMovieByIdDatasource'

describe('Get Movie By Id Datasource', () => {
  const http = mock<IHttp>()
  const datasource = new GetMovieByIdDatasource({ http })

  it('Should return a MovieEntity if status code equal 200', async () => {
    http.get.mockResolvedValue({ data: mockedMovie, statusCode: 200 })

    const result = await datasource.getMovieById(1)

    expect(result).toEqual(mockedMovie)
  })

  it('Should throw DatasourceError if status code different of 200', async () => {
    http.get.mockResolvedValue({ data: mockedMovie, statusCode: 500 })

    await expect(() => datasource.getMovieById(1)).rejects.toThrow(
      DatasourceError
    )
  })
})
