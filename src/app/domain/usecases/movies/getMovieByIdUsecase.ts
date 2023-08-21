import { IUseCase } from '../../../../core/interfaces/usecase'
import { MovieEntity } from '../../entities/MovieEntity'
import { IGetMovieByIdRepository } from '../../repositories/movies/getMovieByIdRepository'

export class GetMovieByIdUsecase
  implements IUseCase<MovieEntity | Error, number>
{
  repository: IGetMovieByIdRepository

  constructor({ repository }: { repository: IGetMovieByIdRepository }) {
    this.repository = repository
  }

  async execute(id: number): Promise<MovieEntity | Error> {
    return await this.repository.getMovieById(id)
  }
}
