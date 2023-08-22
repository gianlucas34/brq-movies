import { useEffect, useState } from 'react'
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
    const [isLoadingReturns, setIsLoadingReturns] = useState<boolean[]>([])
    const { getMovies, movies, isLoading, error } = useMoviesContext()

    useEffect(() => {
      setIsLoadingReturns((isLoadingReturns) => [
        ...isLoadingReturns,
        isLoading,
      ])
    }, [isLoading])

    return (
      <View>
        <Text testID="movies">{JSON.stringify(movies)}</Text>
        {/* This slice of the line below is to remove the initial state from the array */}
        <Text testID="isLoadingReturns">{isLoadingReturns.slice(1)}</Text>
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

    const isLoadingReturns =
      screen.getByTestId('isLoadingReturns').props.children
    const movies = screen.getByTestId('movies').props.children
    const error = screen.getByTestId('error').props.children

    expect(isLoadingReturns).toHaveLength(2)
    expect(isLoadingReturns[0]).toBeTruthy()
    expect(isLoadingReturns[1]).toBeFalsy()
    expect(JSON.parse(movies)).toEqual(mockedMovies)
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

    const isLoadingReturns =
      screen.getByTestId('isLoadingReturns').props.children
    const movies = screen.getByTestId('movies').props.children
    const error = screen.getByTestId('error').props.children

    expect(isLoadingReturns).toHaveLength(2)
    expect(isLoadingReturns[0]).toBeTruthy()
    expect(isLoadingReturns[1]).toBeFalsy()
    expect(JSON.parse(movies)).toHaveLength(0)
    expect(error).toEqual(DatasourceError.message)
  })
})
