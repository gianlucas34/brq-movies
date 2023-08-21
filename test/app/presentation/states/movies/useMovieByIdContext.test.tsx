import { Button, Text, View } from 'react-native'
import { mock } from 'jest-mock-extended'
import { act, fireEvent, render, screen } from '@testing-library/react-native'
import { DatasourceError } from '../../../../../src/core/returns/errors'
import { GetMovieByIdUsecase } from '../../../../../src/app/domain/usecases/movies/getMovieByIdUsecase'
import {
  MovieByIdProvider,
  useMovieByIdContext,
} from '../../../../../src/app/presentation/states/movies/useMovieByIdContext'
import { mockedMovie } from '../../../../mocks/movies/mockedMovie'

describe('Movie By Id Context', () => {
  const usecase = mock<GetMovieByIdUsecase>()
  const TestingComponent = () => {
    const { getMovieById, movie, isLoading, error } = useMovieByIdContext()

    return (
      <View>
        <Text testID="movie">{JSON.stringify(movie)}</Text>
        <Text testID="isLoading">{isLoading}</Text>
        <Text testID="error">{error}</Text>
        <Button
          testID="getMovieByIdButton"
          title="Buscar"
          onPress={() => getMovieById(1)}
        />
      </View>
    )
  }

  it('Should return MovieEntity', async () => {
    render(
      <MovieByIdProvider usecase={usecase}>
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
      <MovieByIdProvider usecase={usecase}>
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
})
