import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { AsyncStorageStatic } from '@react-native-async-storage/async-storage'
import { MovieEntity } from '../../../domain/entities/MovieEntity'

interface IFavoritedMoviesProvider {
  children: React.ReactNode
  storage: AsyncStorageStatic
}

interface IFavoritedMoviesContext {
  getFavoritedMovies: () => void
  favoritedMovies: MovieEntity[]
  setFavoritedMovies: Dispatch<
    SetStateAction<IFavoritedMoviesContext['favoritedMovies']>
  >
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<IFavoritedMoviesContext['isLoading']>>
}

export const FavoritedMoviesContext = createContext<IFavoritedMoviesContext>(
  null!
)

export const FavoritedMoviesProvider = ({
  children,
  storage,
}: IFavoritedMoviesProvider): JSX.Element => {
  const [favoritedMovies, setFavoritedMovies] = useState<MovieEntity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getFavoritedMovies = async () => {
    setIsLoading(true)

    const storagedFavoritedMovies = await storage.getItem('favoritedMovies')

    if (!!storagedFavoritedMovies) {
      const result = JSON.parse(storagedFavoritedMovies)

      setFavoritedMovies(result)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }

  return (
    <FavoritedMoviesContext.Provider
      value={{
        getFavoritedMovies,
        favoritedMovies,
        setFavoritedMovies,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </FavoritedMoviesContext.Provider>
  )
}

export function useFavoritedMoviesContext(): IFavoritedMoviesContext {
  return useContext(FavoritedMoviesContext)
}
