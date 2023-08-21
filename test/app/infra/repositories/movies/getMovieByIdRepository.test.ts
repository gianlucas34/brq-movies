import { mock } from 'jest-mock-extended'
import { INetworkInfo } from '../../../../../src/core/interfaces/networkInfo'
import {
  DatasourceError,
  InternalError,
  NoConnectionError,
} from '../../../../../src/core/returns/errors'
import { IGetMovieByIdDatasource } from '../../../../../src/app/infra/datasources/movies/getMovieByIdDatasource'
import { GetMovieByIdRepository } from '../../../../../src/app/infra/repositories/movies/getMovieByIdRepository'
import { mockedMovie } from '../../../../mocks/movies/mockedMovie'

describe('Get Movie By Id Repository', () => {
  const datasource = mock<IGetMovieByIdDatasource>()
  const networkInfo = mock<INetworkInfo>()
  const repository = new GetMovieByIdRepository({ datasource, networkInfo })

  beforeEach(() => {
    datasource.getMovieById.mockReset()
  })

  it('Should return a MovieEntity if user network is connected', async () => {
    networkInfo.isConnected.mockResolvedValue(true)
    datasource.getMovieById.mockResolvedValue(mockedMovie)

    const result = await repository.getMovieById(1)

    expect(result).toEqual(mockedMovie)
  })

  it('Should return a DatasourceError if user network is connected but datasource failed', async () => {
    networkInfo.isConnected.mockResolvedValue(true)
    datasource.getMovieById.mockRejectedValue(DatasourceError)

    const result = await repository.getMovieById(1)

    expect(result).toEqual(DatasourceError)
  })

  it('Should return a InternalError if user network is connected but the cause not is CustomError', async () => {
    networkInfo.isConnected.mockResolvedValue(true)
    datasource.getMovieById.mockRejectedValue(new Error())

    const result = await repository.getMovieById(1)

    expect(result).toEqual(InternalError)
  })

  it('Should return a NoConnectionError if user network is disconnected', async () => {
    networkInfo.isConnected.mockResolvedValue(false)

    const result = await repository.getMovieById(1)

    expect(datasource.getMovieById).not.toHaveBeenCalled()
    expect(result).toEqual(NoConnectionError)
  })
})
