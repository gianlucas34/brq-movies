import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

import { MovieEntity } from '../../../domain/entities/MovieEntity'
import { GetMovieByIdUsecase } from '../../../domain/usecases/movies/getMovieByIdUsecase'

interface IMovieByIdProvider {
  children: React.ReactNode
  usecase: GetMovieByIdUsecase
  id?: string
}

interface IMovieByIdContext {
  getMovieById: (id: number) => void
  movie?: MovieEntity
  setMovie: Dispatch<SetStateAction<IMovieByIdContext['movie']>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<IMovieByIdContext['isLoading']>>
  error: string
  setError: Dispatch<SetStateAction<IMovieByIdContext['error']>>
}

export const MovieByIdContext = createContext<IMovieByIdContext>(
  {} as IMovieByIdContext
)

export const MovieByIdProvider = ({
  children,
  usecase,
}: IMovieByIdProvider): JSX.Element => {
  const [movie, setMovie] = useState<MovieEntity>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
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

  return (
    <MovieByIdContext.Provider
      value={{
        getMovieById,
        movie,
        setMovie,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </MovieByIdContext.Provider>
  )
}

export function useMovieByIdContext(): IMovieByIdContext {
  return useContext(MovieByIdContext)
}
