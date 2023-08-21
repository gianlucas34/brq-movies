import { MovieEntity } from '../../entities/MovieEntity'

export interface IGetMoviesRepository {
  getMovies(): Promise<MovieEntity[] | Error>
}
