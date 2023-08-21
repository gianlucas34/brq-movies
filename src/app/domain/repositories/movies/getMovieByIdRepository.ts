import { MovieEntity } from '../../entities/MovieEntity'

export interface IGetMovieByIdRepository {
  getMovieById(id: number): Promise<MovieEntity | Error>
}
