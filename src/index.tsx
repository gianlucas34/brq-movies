import React from 'react'
import { StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Routes } from './routes'
import { AuthProvider } from './app/presentation/states/useAuthContext'
import { LoginUsecase } from './app/domain/usecases/auth/loginUsecase'
import { LoginRepository } from './app/infra/repositories/auth/loginRepository'
import { LoginDatasource } from './app/external/datasources/auth/loginDatasource'
import { NetworkInfo } from './core/services/networkInfo'

export const App = () => {
  const datasource = new LoginDatasource()
  const networkInfo = new NetworkInfo()
  const repository = new LoginRepository({ datasource, networkInfo })
  const usecase = new LoginUsecase({ repository })

  return (
    <>
      <StatusBar backgroundColor="#16171B" />
      <AuthProvider usecase={usecase} storage={AsyncStorage}>
        <Routes />
      </AuthProvider>
    </>
  )
}
