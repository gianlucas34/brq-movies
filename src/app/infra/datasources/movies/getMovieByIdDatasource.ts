import { MovieEntity } from '../../../domain/entities/MovieEntity'

export interface IGetMovieByIdDatasource {
  getMovieById(id: number): Promise<MovieEntity | Error>
}
