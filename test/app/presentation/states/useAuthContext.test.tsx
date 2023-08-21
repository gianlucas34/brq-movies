import React, { useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native'
import { mock } from 'jest-mock-extended'
import { act, fireEvent, render, screen } from '@testing-library/react-native'
import { AsyncStorageStatic } from '@react-native-async-storage/async-storage'
import {
  AuthProvider,
  useAuthContext,
} from '../../../../src/app/presentation/states/useAuthContext'
import { LoginUsecase } from '../../../../src/app/domain/usecases/auth/loginUsecase'
import { mockedCredentials } from '../../../mocks/auth/mockedCredentials'
import { mockedUser } from '../../../mocks/auth/mockedUser'
import { LoginError } from '../../../../src/core/returns/errors'

describe('Auth Context', () => {
  const usecase = mock<LoginUsecase>()
  const validateAuthStorage = mock<AsyncStorageStatic>({
    getItem: async () => await JSON.stringify(mockedUser),
  })
  const storage = mock<AsyncStorageStatic>()
  const TestingComponent = () => {
    const [isLoadingReturns, setIsLoadingReturns] = useState<boolean[]>([])
    const {
      loggedUser,
      shouldValidateAuth,
      isAuthenticated,
      isLoading,
      error,
      login,
      logout,
    } = useAuthContext()

    useEffect(() => {
      setIsLoadingReturns((isLoadingReturns) => [
        ...isLoadingReturns,
        isLoading,
      ])
    }, [isLoading])

    return (
      <View>
        <Text testID="loggedUser">{JSON.stringify(loggedUser)}</Text>
        <Text testID="shouldValidateAuth">{shouldValidateAuth}</Text>
        <Text testID="isAuthenticated">{isAuthenticated}</Text>
        {/* This slice of the line below is to remove the initial state from the array */}
        <Text testID="isLoadingReturns">{isLoadingReturns.slice(1)}</Text>
        <Text testID="error">{error}</Text>
        <Button
          testID="loginButton"
          title="Entrar"
          onPress={() => login(mockedCredentials)}
        />
        <Button testID="logoutButton" title="Entrar" onPress={() => logout()} />
      </View>
    )
  }

  beforeEach(() => {
    storage.setItem.mockClear()
  })

  it('Should call validateAuth() if there is a user in AsyncStorage', async () => {
    render(
      <AuthProvider usecase={usecase} storage={validateAuthStorage}>
        <TestingComponent />
      </AuthProvider>
    )

    await act(async () => await validateAuthStorage.getItem('user'))

    const isLoadingReturns =
      screen.getByTestId('isLoadingReturns').props.children
    const shouldValidateAuth =
      screen.getByTestId('shouldValidateAuth').props.children
    const isAuthenticated = screen.getByTestId('isAuthenticated').props.children
    const error = screen.getByTestId('error').props.children
    const loggedUser = screen.getByTestId('loggedUser').props.children

    expect(isLoadingReturns).toHaveLength(2)
    expect(isLoadingReturns[0]).toBeTruthy()
    expect(isLoadingReturns[1]).toBeFalsy()
    expect(shouldValidateAuth).toBeFalsy()
    expect(isAuthenticated).toBeTruthy()
    expect(error).toEqual('')
    expect(JSON.parse(loggedUser)).toEqual(mockedUser)
  })

  it('Should set shouldValidateAuth to false if if there is no user in AsyncStorage ', async () => {
    render(
      <AuthProvider usecase={usecase} storage={storage}>
        <TestingComponent />
      </AuthProvider>
    )

    await act(async () => await storage.getItem('user'))

    const shouldValidateAuth =
      screen.getByTestId('shouldValidateAuth').props.children

    expect(shouldValidateAuth).toBeFalsy()
  })

  it('Should login', async () => {
    render(
      <AuthProvider usecase={usecase} storage={storage}>
        <TestingComponent />
      </AuthProvider>
    )
    usecase.execute.mockResolvedValue(mockedUser)

    const loginButton = screen.getByTestId('loginButton')

    await act(async () => await fireEvent.press(loginButton))
    await act(async () => await storage.getItem('user'))

    const isLoadingReturns =
      screen.getByTestId('isLoadingReturns').props.children
    const shouldValidateAuth =
      screen.getByTestId('shouldValidateAuth').props.children
    const isAuthenticated = screen.getByTestId('isAuthenticated').props.children
    const error = screen.getByTestId('error').props.children
    const loggedUser = screen.getByTestId('loggedUser').props.children

    expect(storage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify(mockedUser)
    )
    expect(isLoadingReturns).toHaveLength(2)
    expect(isLoadingReturns[0]).toBeTruthy()
    expect(isLoadingReturns[1]).toBeFalsy()
    expect(shouldValidateAuth).toBeFalsy()
    expect(isAuthenticated).toBeTruthy()
    expect(error).toEqual('')
    expect(JSON.parse(loggedUser)).toEqual(mockedUser)
  })

  it('Should return LoginError', async () => {
    render(
      <AuthProvider usecase={usecase} storage={storage}>
        <TestingComponent />
      </AuthProvider>
    )
    usecase.execute.mockResolvedValue(LoginError)

    const loginButton = screen.getByTestId('loginButton')

    await act(async () => await fireEvent.press(loginButton))
    await act(async () => await storage.getItem('user'))

    const isLoadingReturns =
      screen.getByTestId('isLoadingReturns').props.children
    const shouldValidateAuth =
      screen.getByTestId('shouldValidateAuth').props.children
    const isAuthenticated = screen.getByTestId('isAuthenticated').props.children
    const error = screen.getByTestId('error').props.children
    const loggedUser = screen.getByTestId('loggedUser').props.children

    expect(storage.setItem).not.toHaveBeenCalled()
    expect(isLoadingReturns).toHaveLength(2)
    expect(isLoadingReturns[0]).toBeTruthy()
    expect(isLoadingReturns[1]).toBeFalsy()
    expect(shouldValidateAuth).toBeFalsy()
    expect(isAuthenticated).toBeFalsy()
    expect(error).toEqual(LoginError.message)
    expect(loggedUser).toBeUndefined()
  })

  it('Should logout', async () => {
    render(
      <AuthProvider usecase={usecase} storage={storage}>
        <TestingComponent />
      </AuthProvider>
    )

    const logoutButton = screen.getByTestId('logoutButton')

    await act(async () => await fireEvent.press(logoutButton))

    const isAuthenticated = screen.getByTestId('isAuthenticated').props.children
    const loggedUser = screen.getByTestId('loggedUser').props.children

    expect(storage.clear).toHaveBeenCalled()
    expect(isAuthenticated).toBeFalsy()
    expect(loggedUser).toBeUndefined()
  })
})
