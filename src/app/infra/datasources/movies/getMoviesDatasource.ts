import { MovieEntity } from '../../../domain/entities/MovieEntity'

export interface IGetMoviesDatasource {
  getMovies(): Promise<MovieEntity[] | Error>
}
