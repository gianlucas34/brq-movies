import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

import { MovieEntity } from '../../../domain/entities/MovieEntity'
import { GetMoviesUsecase } from '../../../domain/usecases/movies/getMoviesUsecase'

interface IMoviesProvider {
  children: React.ReactNode
  usecase: GetMoviesUsecase
}

interface IMoviesContext {
  getMovies: () => void
  movies: MovieEntity[]
  setMovies: Dispatch<SetStateAction<IMoviesContext['movies']>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<IMoviesContext['isLoading']>>
  error: string
  setError: Dispatch<SetStateAction<IMoviesContext['error']>>
}

export const MoviesContext = createContext<IMoviesContext>(null!)

export const MoviesProvider = ({
  children,
  usecase,
}: IMoviesProvider): JSX.Element => {
  const [movies, setMovies] = useState<MovieEntity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const getMovies = async () => {
    setIsLoading(true)

    const result = await usecase.execute()

    if (Array.isArray(result)) {
      setMovies(result)
      setIsLoading(false)
    } else {
      setError(result.message)
      setIsLoading(false)
    }
  }

  return (
    <MoviesContext.Provider
      value={{
        getMovies,
        movies,
        setMovies,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}

export function useMoviesContext(): IMoviesContext {
  return useContext(MoviesContext)
}
