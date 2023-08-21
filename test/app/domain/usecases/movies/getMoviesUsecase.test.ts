import { mock } from 'jest-mock-extended'
import { GetMoviesUsecase } from '../../../../../src/app/domain/usecases/movies/getMoviesUsecase'
import { IGetMoviesRepository } from '../../../../../src/app/domain/repositories/movies/getMoviesRepository'
import { mockedMovies } from '../../../../mocks/movies/mockedMovies'
import { NoConnectionError } from '../../../../../src/core/returns/errors'

describe('Get Movies Usecase', () => {
  const repository = mock<IGetMoviesRepository>()
  const usecase = new GetMoviesUsecase({ repository })

  it('Should return MovieEntity[]', async () => {
    repository.getMovies.mockResolvedValue(mockedMovies)

    const result = await usecase.execute()

    expect(result).toEqual(mockedMovies)
  })

  it('Should return Error', async () => {
    repository.getMovies.mockResolvedValue(NoConnectionError)

    const result = await usecase.execute()

    expect(result).toEqual(NoConnectionError)
  })
})
