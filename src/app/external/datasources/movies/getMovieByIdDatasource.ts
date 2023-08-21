import { IHttp } from '../../../../core/interfaces/http'
import { DatasourceError } from '../../../../core/returns/errors'
import { MovieEntity } from '../../../domain/entities/MovieEntity'
import { IGetMovieByIdDatasource } from '../../../infra/datasources/movies/getMovieByIdDatasource'
import { MovieModel } from '../../../infra/models/MovieModel'

export class GetMovieByIdDatasource implements IGetMovieByIdDatasource {
  http: IHttp

  constructor({ http }: { http: IHttp }) {
    this.http = http
  }

  async getMovieById(id: number): Promise<MovieEntity | Error> {
    const result = await this.http.get(`/movie/${id}`)

    if (result.statusCode === 200) {
      const data = result.data as MovieEntity

      return new MovieModel(data).fromJson()
    } else {
      throw DatasourceError
    }
  }
}
