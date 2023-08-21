import { INetworkInfo } from '../../../../core/interfaces/networkInfo'
import {
  InternalError,
  NoConnectionError,
} from '../../../../core/returns/errors'
import { MovieEntity } from '../../../domain/entities/MovieEntity'
import { IGetMovieByIdRepository } from '../../../domain/repositories/movies/getMovieByIdRepository'
import { IGetMovieByIdDatasource } from '../../datasources/movies/getMovieByIdDatasource'

export class GetMovieByIdRepository implements IGetMovieByIdRepository {
  datasource: IGetMovieByIdDatasource
  networkInfo: INetworkInfo

  constructor({
    datasource,
    networkInfo,
  }: {
    datasource: IGetMovieByIdDatasource
    networkInfo: INetworkInfo
  }) {
    this.datasource = datasource
    this.networkInfo = networkInfo
  }
  async getMovieById(id: number): Promise<MovieEntity | Error> {
    const isConnected = await this.networkInfo.isConnected()

    if (typeof isConnected === 'boolean' && isConnected) {
      try {
        return await this.datasource.getMovieById(id)
      } catch (error: any) {
        const isCustomError = error?.cause
          ? error.cause === 'CustomError'
          : false

        if (isCustomError) {
          return error
        } else {
          return InternalError
        }
      }
    } else {
      return NoConnectionError
    }
  }
}
