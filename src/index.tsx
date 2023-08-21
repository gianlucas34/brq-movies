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

export const App = () => {
  const loginDatasource = new LoginDatasource()
  const networkInfo = new NetworkInfo()
  const loginRepository = new LoginRepository({
    datasource: loginDatasource,
    networkInfo,
  })
  const loginUsecase = new LoginUsecase({ repository: loginRepository })

  const http = new Http()
  const datasource = new GetMoviesDatasource({ http })
  const repository = new GetMoviesRepository({ datasource, networkInfo })
  const getMoviesUsecase = new GetMoviesUsecase({ repository })

  return (
    <>
      <StatusBar backgroundColor="#16171B" />
      <AuthProvider usecase={loginUsecase} storage={AsyncStorage}>
        <MoviesProvider usecase={getMoviesUsecase}>
          <Routes />
        </MoviesProvider>
      </AuthProvider>
    </>
  )
}
