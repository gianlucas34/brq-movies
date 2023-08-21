import { IHttp } from '../../../../core/interfaces/http'
import { DatasourceError } from '../../../../core/returns/errors'
import { MovieEntity } from '../../../domain/entities/MovieEntity'
import { IGetMoviesDatasource } from '../../../infra/datasources/movies/getMoviesDatasource'
import { MovieModel } from '../../../infra/models/MovieModel'

export class GetMoviesDatasource implements IGetMoviesDatasource {
  http: IHttp

  constructor({ http }: { http: IHttp }) {
    this.http = http
  }

  async getMovies(): Promise<MovieEntity[] | Error> {
    const result = await this.http.get('/trending/movie/day')

    if (result.statusCode === 200) {
      const data = result.data as MovieEntity[]

      return data.map((item) => new MovieModel(item).fromJson())
    } else {
      throw DatasourceError
    }
  }
}
