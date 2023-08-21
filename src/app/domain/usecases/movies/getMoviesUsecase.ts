import { INoParams, IUseCase } from '../../../../core/interfaces/usecase'
import { MovieEntity } from '../../entities/MovieEntity'
import { IGetMoviesRepository } from '../../repositories/movies/getMoviesRepository'

export class GetMoviesUsecase
  implements IUseCase<MovieEntity[] | Error, INoParams>
{
  repository: IGetMoviesRepository

  constructor({ repository }: { repository: IGetMoviesRepository }) {
    this.repository = repository
  }

  async execute(): Promise<MovieEntity[] | Error> {
    return await this.repository.getMovies()
  }
}
