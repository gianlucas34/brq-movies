import { mock } from 'jest-mock-extended'
import { GetMoviesRepository } from '../../../../../src/app/infra/repositories/movies/getMoviesRepository'
import { IGetMoviesDatasource } from '../../../../../src/app/infra/datasources/movies/getMoviesDatasource'
import { INetworkInfo } from '../../../../../src/core/interfaces/networkInfo'
import {
  DatasourceError,
  InternalError,
  NoConnectionError,
} from '../../../../../src/core/returns/errors'
import { mockedMovies } from '../../../../mocks/movies/mockedMovies'

describe('Get Movies Repository', () => {
  const datasource = mock<IGetMoviesDatasource>()
  const networkInfo = mock<INetworkInfo>()
  const repository = new GetMoviesRepository({ datasource, networkInfo })

  beforeEach(() => {
    datasource.getMovies.mockReset()
  })

  it('Should return a MovieEntity[] if user network is connected', async () => {
    networkInfo.isConnected.mockResolvedValue(true)
    datasource.getMovies.mockResolvedValue(mockedMovies)

    const result = await repository.getMovies()

    expect(result).toEqual(mockedMovies)
  })

  it('Should return a DatasourceError if user network is connected but datasource failed', async () => {
    networkInfo.isConnected.mockResolvedValue(true)
    datasource.getMovies.mockRejectedValue(DatasourceError)

    const result = await repository.getMovies()

    expect(result).toEqual(DatasourceError)
  })

  it('Should return a InternalError if user network is connected but the cause not is CustomError', async () => {
    networkInfo.isConnected.mockResolvedValue(true)
    datasource.getMovies.mockRejectedValue(new Error())

    const result = await repository.getMovies()

    expect(result).toEqual(InternalError)
  })

  it('Should return a NoConnectionError if user network is disconnected', async () => {
    networkInfo.isConnected.mockResolvedValue(false)

    const result = await repository.getMovies()

    expect(datasource.getMovies).not.toHaveBeenCalled()
    expect(result).toEqual(NoConnectionError)
  })
})
