import { mock } from 'jest-mock-extended'
import { NoConnectionError } from '../../../../../src/core/returns/errors'
import { mockedMovie } from '../../../../mocks/movies/mockedMovie'
import { IGetMovieByIdRepository } from '../../../../../src/app/domain/repositories/movies/getMovieByIdRepository'
import { GetMovieByIdUsecase } from '../../../../../src/app/domain/usecases/movies/getMovieByIdUsecase'

describe('Get Movie By Id Usecase', () => {
  const repository = mock<IGetMovieByIdRepository>()
  const usecase = new GetMovieByIdUsecase({ repository })

  it('Should return MovieEntity', async () => {
    repository.getMovieById.mockResolvedValue(mockedMovie)

    const result = await usecase.execute(1)

    expect(result).toEqual(mockedMovie)
  })

  it('Should return Error', async () => {
    repository.getMovieById.mockResolvedValue(NoConnectionError)

    const result = await usecase.execute(1)

    expect(result).toEqual(NoConnectionError)
  })
})
