import React from 'react'
import { StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Routes } from './routes'
import { AuthProvider } from './app/presentation/states/auth/useAuthContext'
import { LoginUsecase } from './app/domain/usecases/auth/loginUsecase'
import { LoginRepository } from './app/infra/repositories/auth/loginRepository'
import { LoginDatasource } from './app/external/datasources/auth/loginDatasource'
import { NetworkInfo } from './core/services/networkInfo'
import { MoviesProvider } from './app/presentation/states/movies/useMoviesContext'
import { GetMoviesUsecase } from './app/domain/usecases/movies/getMoviesUsecase'
import { GetMoviesRepository } from './app/infra/repositories/movies/getMoviesRepository'
import { GetMoviesDatasource } from './app/external/datasources/movies/getMoviesDatasource'
import { Http } from './core/services/http'
import { MovieByIdProvider } from './app/presentation/states/movies/useMovieByIdContext'
import { GetMovieByIdUsecase } from './app/domain/usecases/movies/getMovieByIdUsecase'
import { GetMovieByIdRepository } from './app/infra/repositories/movies/getMovieByIdRepository'
import { GetMovieByIdDatasource } from './app/external/datasources/movies/getMovieByIdDatasource'
import { FavoritedMoviesProvider } from './app/presentation/states/movies/useFavoritedMoviesContext'

export const App = () => {
  const http = new Http()
  const networkInfo = new NetworkInfo()

  const loginDatasource = new LoginDatasource()
  const loginRepository = new LoginRepository({
    datasource: loginDatasource,
    networkInfo,
  })
  const loginUsecase = new LoginUsecase({ repository: loginRepository })

  const getMoviesDatasource = new GetMoviesDatasource({ http })
  const getMoviesRepository = new GetMoviesRepository({
    datasource: getMoviesDatasource,
    networkInfo,
  })
  const getMoviesUsecase = new GetMoviesUsecase({
    repository: getMoviesRepository,
  })

  const getMovieByIdDatasource = new GetMovieByIdDatasource({ http })
  const getMovieByIdRepository = new GetMovieByIdRepository({
    datasource: getMovieByIdDatasource,
    networkInfo,
  })
  const getMovieByIdUsecase = new GetMovieByIdUsecase({
    repository: getMovieByIdRepository,
  })

  return (
    <>
      <StatusBar backgroundColor="#16171B" />
      <AuthProvider usecase={loginUsecase} storage={AsyncStorage}>
        <MoviesProvider usecase={getMoviesUsecase}>
          <MovieByIdProvider
            usecase={getMovieByIdUsecase}
            storage={AsyncStorage}
          >
            <FavoritedMoviesProvider storage={AsyncStorage}>
              <Routes />
            </FavoritedMoviesProvider>
          </MovieByIdProvider>
        </MoviesProvider>
      </AuthProvider>
    </>
  )
}
