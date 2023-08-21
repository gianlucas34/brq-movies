import { INetworkInfo } from '../../../../core/interfaces/networkInfo'
import {
  InternalError,
  NoConnectionError,
} from '../../../../core/returns/errors'
import { MovieEntity } from '../../../domain/entities/MovieEntity'
import { IGetMoviesRepository } from '../../../domain/repositories/movies/getMoviesRepository'
import { IGetMoviesDatasource } from '../../datasources/movies/getMoviesDatasource'

export class GetMoviesRepository implements IGetMoviesRepository {
  datasource: IGetMoviesDatasource
  networkInfo: INetworkInfo

  constructor({
    datasource,
    networkInfo,
  }: {
    datasource: IGetMoviesDatasource
    networkInfo: INetworkInfo
  }) {
    this.datasource = datasource
    this.networkInfo = networkInfo
  }

  async getMovies(): Promise<MovieEntity[] | Error> {
    const isConnected = await this.networkInfo.isConnected()

    if (typeof isConnected === 'boolean' && isConnected) {
      try {
        return await this.datasource.getMovies()
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
