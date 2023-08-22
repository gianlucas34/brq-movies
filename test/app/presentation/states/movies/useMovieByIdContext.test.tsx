import { Button, Text, View } from 'react-native'
import { mock } from 'jest-mock-extended'
import { act, fireEvent, render, screen } from '@testing-library/react-native'
import { AsyncStorageStatic } from '@react-native-async-storage/async-storage'
import { DatasourceError } from '../../../../../src/core/returns/errors'
import { GetMovieByIdUsecase } from '../../../../../src/app/domain/usecases/movies/getMovieByIdUsecase'
import {
  MovieByIdProvider,
  useMovieByIdContext,
} from '../../../../../src/app/presentation/states/movies/useMovieByIdContext'
import { mockedMovie } from '../../../../mocks/movies/mockedMovie'
import { mockedMovies } from '../../../../mocks/movies/mockedMovies'

describe('Movie By Id Context', () => {
  const usecase = mock<GetMovieByIdUsecase>()
  const storage = mock<AsyncStorageStatic>({
    getItem: async () => await JSON.stringify(mockedMovies),
  })
  const TestingComponent = () => {
    const {
      getMovieById,
      checkMovieIsFavorited,
      favoriteMovie,
      disfavorMovie,
      movie,
      isLoading,
      error,
      isFavorited,
    } = useMovieByIdContext()

    return (
      <View>
        <Text testID="movie">{JSON.stringify(movie)}</Text>
        <Text testID="isLoading">{isLoading}</Text>
        <Text testID="error">{error}</Text>
        <Text testID="isFavorited">{isFavorited}</Text>
        <Button
          testID="getMovieByIdButton"
          title="Buscar"
          onPress={() => getMovieById(mockedMovie.id)}
        />
        <Button
          testID="checkMovieIsFavoritedButton"
          title="Buscar"
          onPress={() => checkMovieIsFavorited(mockedMovie.id)}
        />
        <Button
          testID="checkMovieIsFavoritedButton2"
          title="Buscar"
          onPress={() => checkMovieIsFavorited(1)}
        />
        <Button
          testID="favoriteMovieButton"
          title="Buscar"
          onPress={() => favoriteMovie(mockedMovie)}
        />
        <Button
          testID="disfavorMovieButton"
          title="Buscar"
          onPress={() => disfavorMovie(mockedMovie.id)}
        />
      </View>
    )
  }

  it('Should return MovieEntity', async () => {
    render(
      <MovieByIdProvider usecase={usecase} storage={storage}>
        <TestingComponent />
      </MovieByIdProvider>
    )
    usecase.execute.mockResolvedValue(mockedMovie)

    const getMovieByIdButton = screen.getByTestId('getMovieByIdButton')

    await act(async () => await fireEvent.press(getMovieByIdButton))

    const movie = screen.getByTestId('movie').props.children
    const isLoading = screen.getByTestId('isLoading').props.children
    const error = screen.getByTestId('error').props.children

    expect(JSON.parse(movie)).toEqual(mockedMovie)
    expect(isLoading).toBeFalsy()
    expect(error).toEqual('')
  })

  it('Should return DatasourceError', async () => {
    render(
      <MovieByIdProvider usecase={usecase} storage={storage}>
        <TestingComponent />
      </MovieByIdProvider>
    )
    usecase.execute.mockResolvedValue(DatasourceError)

    const getMovieByIdButton = screen.getByTestId('getMovieByIdButton')

    await act(async () => await fireEvent.press(getMovieByIdButton))

    const movie = screen.getByTestId('movie').props.children
    const isLoading = screen.getByTestId('isLoading').props.children
    const error = screen.getByTestId('error').props.children

    expect(movie).toBeUndefined()
    expect(isLoading).toBeFalsy()
    expect(error).toEqual(DatasourceError.message)
  })

  it('Should return that the movie is favorited', async () => {
    render(
      <MovieByIdProvider usecase={usecase} storage={storage}>
        <TestingComponent />
      </MovieByIdProvider>
    )

    const checkMovieIsFavoritedButton = screen.getByTestId(
      'checkMovieIsFavoritedButton'
    )

    await act(async () => await fireEvent.press(checkMovieIsFavoritedButton))
    await act(async () => await storage.getItem('favoritedMovies'))

    const isFavorited = screen.getByTestId('isFavorited').props.children

    expect(isFavorited).toBeTruthy()
  })

  it('Should return that the movie is not favorited', async () => {
    render(
      <MovieByIdProvider usecase={usecase} storage={storage}>
        <TestingComponent />
      </MovieByIdProvider>
    )

    const checkMovieIsFavoritedButton2 = screen.getByTestId(
      'checkMovieIsFavoritedButton2'
    )

    await act(async () => await fireEvent.press(checkMovieIsFavoritedButton2))
    await act(async () => await storage.getItem('favoritedMovies'))

    const isFavorited = screen.getByTestId('isFavorited').props.children

    expect(isFavorited).toBeFalsy()
  })

  it('Should favorite movie', async () => {
    render(
      <MovieByIdProvider usecase={usecase} storage={storage}>
        <TestingComponent />
      </MovieByIdProvider>
    )

    const favoriteMovieButton = screen.getByTestId('favoriteMovieButton')

    await act(async () => await fireEvent.press(favoriteMovieButton))
    await act(async () => await storage.getItem('favoritedMovies'))

    const isFavorited = screen.getByTestId('isFavorited').props.children

    expect(storage.setItem).toHaveBeenCalledWith(
      'favoritedMovies',
      JSON.stringify([...mockedMovies, mockedMovie])
    )
    expect(isFavorited).toBeTruthy()
  })

  it('Should disfavor movie', async () => {
    render(
      <MovieByIdProvider usecase={usecase} storage={storage}>
        <TestingComponent />
      </MovieByIdProvider>
    )

    const disfavorMovieButton = screen.getByTestId('disfavorMovieButton')

    await act(async () => await fireEvent.press(disfavorMovieButton))
    await act(async () => await storage.getItem('favoritedMovies'))

    const isFavorited = screen.getByTestId('isFavorited').props.children

    expect(storage.setItem).toHaveBeenCalledWith(
      'favoritedMovies',
      JSON.stringify([])
    )
    expect(isFavorited).toBeFalsy()
  })
})
