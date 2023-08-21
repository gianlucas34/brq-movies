import { Button, Text, View } from 'react-native'
import { mock } from 'jest-mock-extended'
import { act, fireEvent, render, screen } from '@testing-library/react-native'
import {
  MoviesProvider,
  useMoviesContext,
} from '../../../../../src/app/presentation/states/movies/useMoviesContext'
import { GetMoviesUsecase } from '../../../../../src/app/domain/usecases/movies/getMoviesUsecase'
import { mockedMovies } from '../../../../mocks/movies/mockedMovies'
import { DatasourceError } from '../../../../../src/core/returns/errors'

describe('Movies Context', () => {
  const usecase = mock<GetMoviesUsecase>()
  const TestingComponent = () => {
    const { getMovies, movies, isLoading, error } = useMoviesContext()

    return (
      <View>
        <Text testID="movies">{JSON.stringify(movies)}</Text>
        <Text testID="isLoading">{isLoading}</Text>
        <Text testID="error">{error}</Text>
        <Button
          testID="getMoviesButton"
          title="Buscar"
          onPress={() => getMovies()}
        />
      </View>
    )
  }

  it('Should return MovieEntity[]', async () => {
    render(
      <MoviesProvider usecase={usecase}>
        <TestingComponent />
      </MoviesProvider>
    )
    usecase.execute.mockResolvedValue(mockedMovies)

    const getMoviesButton = screen.getByTestId('getMoviesButton')

    await act(async () => await fireEvent.press(getMoviesButton))

    const movies = screen.getByTestId('movies').props.children
    const isLoading = screen.getByTestId('isLoading').props.children
    const error = screen.getByTestId('error').props.children

    expect(JSON.parse(movies)).toEqual(mockedMovies)
    expect(isLoading).toBeFalsy()
    expect(error).toEqual('')
  })

  it('Should return DatasourceError', async () => {
    render(
      <MoviesProvider usecase={usecase}>
        <TestingComponent />
      </MoviesProvider>
    )
    usecase.execute.mockResolvedValue(DatasourceError)

    const getMoviesButton = screen.getByTestId('getMoviesButton')

    await act(async () => await fireEvent.press(getMoviesButton))

    const movies = screen.getByTestId('movies').props.children
    const isLoading = screen.getByTestId('isLoading').props.children
    const error = screen.getByTestId('error').props.children

    expect(JSON.parse(movies)).toHaveLength(0)
    expect(isLoading).toBeFalsy()
    expect(error).toEqual(DatasourceError.message)
  })
})
