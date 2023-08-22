import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { AsyncStorageStatic } from '@react-native-async-storage/async-storage'
import { MovieEntity } from '../../../domain/entities/MovieEntity'
import { GetMovieByIdUsecase } from '../../../domain/usecases/movies/getMovieByIdUsecase'

interface IMovieByIdProvider {
  children: React.ReactNode
  usecase: GetMovieByIdUsecase
  storage: AsyncStorageStatic
}

interface IMovieByIdContext {
  getMovieById: (id: number) => void
  checkMovieIsFavorited: (id: number) => void
  favoriteMovie: (movie: MovieEntity) => void
  disfavorMovie: (id: number) => void
  movie?: MovieEntity
  setMovie: Dispatch<SetStateAction<IMovieByIdContext['movie']>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<IMovieByIdContext['isLoading']>>
  error: string
  setError: Dispatch<SetStateAction<IMovieByIdContext['error']>>
  isFavorited: boolean
}

export const MovieByIdContext = createContext<IMovieByIdContext>(
  {} as IMovieByIdContext
)

export const MovieByIdProvider = ({
  children,
  usecase,
  storage,
}: IMovieByIdProvider): JSX.Element => {
  const [movie, setMovie] = useState<MovieEntity>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isFavorited, setIsFavorited] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const getMovieById = async (id: number) => {
    const result = await usecase.execute(id)

    if ('id' in result) {
      setMovie(result)
      setIsLoading(false)
    } else {
      setError(result.message)
      setIsLoading(false)
    }
  }

  const checkMovieIsFavorited = async (id: number) => {
    const storagedFavoritedMovies = await storage.getItem('favoritedMovies')
    const favoritedMovies: MovieEntity[] = !!storagedFavoritedMovies
      ? JSON.parse(storagedFavoritedMovies)
      : []
    const movieIsFavorited =
      favoritedMovies.findIndex((item) => item.id === id) !== -1

    setIsFavorited(movieIsFavorited)
  }

  const favoriteMovie = async (movie: MovieEntity) => {
    const storagedFavoritedMovies = await storage.getItem('favoritedMovies')
    const favoritedMovies: MovieEntity[] = !!storagedFavoritedMovies
      ? JSON.parse(storagedFavoritedMovies)
      : []

    await storage.setItem(
      'favoritedMovies',
      JSON.stringify([...favoritedMovies, movie])
    )

    setIsFavorited(true)
  }

  const disfavorMovie = async (id: number) => {
    const storagedFavoritedMovies = await storage.getItem('favoritedMovies')
    const favoritedMovies: MovieEntity[] = !!storagedFavoritedMovies
      ? JSON.parse(storagedFavoritedMovies)
      : []
    const newFavoritedMovies = favoritedMovies.filter((item) => item.id !== id)

    await storage.setItem('favoritedMovies', JSON.stringify(newFavoritedMovies))

    setIsFavorited(false)
  }

  return (
    <MovieByIdContext.Provider
      value={{
        getMovieById,
        checkMovieIsFavorited,
        favoriteMovie,
        disfavorMovie,
        movie,
        setMovie,
        isLoading,
        setIsLoading,
        error,
        setError,
        isFavorited,
      }}
    >
      {children}
    </MovieByIdContext.Provider>
  )
}

export function useMovieByIdContext(): IMovieByIdContext {
  return useContext(MovieByIdContext)
}
