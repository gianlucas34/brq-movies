import React from 'react'
import { Routes } from './routes'
import { AuthProvider } from './app/presentation/states/useAuthContext'

export const App = () => (
  <AuthProvider>
    <Routes />
  </AuthProvider>
)
