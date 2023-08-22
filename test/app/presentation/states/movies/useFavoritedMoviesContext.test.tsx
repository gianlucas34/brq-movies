import { useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native'
import { mock } from 'jest-mock-extended'
import { act, fireEvent, render, screen } from '@testing-library/react-native'
import { AsyncStorageStatic } from '@react-native-async-storage/async-storage'
import { mockedMovies } from '../../../../mocks/movies/mockedMovies'
import {
  FavoritedMoviesProvider,
  useFavoritedMoviesContext,
} from '../../../../../src/app/presentation/states/movies/useFavoritedMoviesContext'

describe('Favorited Movies Context', () => {
  const storageReturnMovies = mock<AsyncStorageStatic>({
    getItem: async () => await JSON.stringify(mockedMovies),
  })
  const storage = mock<AsyncStorageStatic>()
  const TestingComponent = () => {
    const [isLoadingReturns, setIsLoadingReturns] = useState<boolean[]>([])
    const { getFavoritedMovies, favoritedMovies, isLoading } =
      useFavoritedMoviesContext()

    useEffect(() => {
      setIsLoadingReturns((isLoadingReturns) => [
        ...isLoadingReturns,
        isLoading,
      ])
    }, [isLoading])

    return (
      <View>
        <Text testID="favoritedMovies">{JSON.stringify(favoritedMovies)}</Text>
        {/* This slice of the line below is to remove the initial state from the array */}
        <Text testID="isLoadingReturns">{isLoadingReturns.slice(1)}</Text>
        <Button
          testID="getFavoritedMoviesButton"
          title="Buscar"
          onPress={() => getFavoritedMovies()}
        />
      </View>
    )
  }

  it('Should return MovieEntity[]', async () => {
    render(
      <FavoritedMoviesProvider storage={storageReturnMovies}>
        <TestingComponent />
      </FavoritedMoviesProvider>
    )

    const getFavoritedMoviesButton = screen.getByTestId(
      'getFavoritedMoviesButton'
    )

    await act(async () => await fireEvent.press(getFavoritedMoviesButton))
    await act(async () => await storageReturnMovies.getItem('favoritedMovies'))

    const isLoadingReturns =
      screen.getByTestId('isLoadingReturns').props.children
    const favoritedMovies = screen.getByTestId('favoritedMovies').props.children

    expect(isLoadingReturns).toHaveLength(2)
    expect(isLoadingReturns[0]).toBeTruthy()
    expect(isLoadingReturns[1]).toBeFalsy()
    expect(JSON.parse(favoritedMovies)).toEqual(mockedMovies)
  })

  it('Should return isLoading false', async () => {
    render(
      <FavoritedMoviesProvider storage={storage}>
        <TestingComponent />
      </FavoritedMoviesProvider>
    )

    const getFavoritedMoviesButton = screen.getByTestId(
      'getFavoritedMoviesButton'
    )

    await act(async () => await fireEvent.press(getFavoritedMoviesButton))
    await act(async () => await storage.getItem('favoritedMovies'))

    const isLoadingReturns =
      screen.getByTestId('isLoadingReturns').props.children
    const favoritedMovies = screen.getByTestId('favoritedMovies').props.children

    expect(isLoadingReturns).toHaveLength(2)
    expect(isLoadingReturns[0]).toBeTruthy()
    expect(isLoadingReturns[1]).toBeFalsy()
    expect(JSON.parse(favoritedMovies)).toHaveLength(0)
  })
})
