import React, { useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native'
import { mock } from 'jest-mock-extended'
import { act, fireEvent, render, screen } from '@testing-library/react-native'
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
  const TestingComponent = () => {
    const [isLoadingReturns, setIsLoadingReturns] = useState<boolean[]>([])
    const { loggedUser, isAuthenticated, isLoading, error, login } =
      useAuthContext()

    useEffect(() => {
      setIsLoadingReturns((isLoadingReturns) => [
        ...isLoadingReturns,
        isLoading,
      ])
    }, [isLoading])

    return (
      <View>
        <Text testID="loggedUser">{JSON.stringify(loggedUser)}</Text>
        <Text testID="isAuthenticated">{isAuthenticated}</Text>
        <Text testID="isLoadingReturns">{isLoadingReturns.slice(1)}</Text>
        <Text testID="error">{error}</Text>
        <Button
          testID="loginButton"
          title="Entrar"
          onPress={() => login(mockedCredentials)}
        />
      </View>
    )
  }

  it('Should login', async () => {
    render(
      <AuthProvider loginUsecase={usecase}>
        <TestingComponent />
      </AuthProvider>
    )
    usecase.execute.mockResolvedValue(mockedUser)

    const loginButton = screen.getByTestId('loginButton')

    await act(() => fireEvent.press(loginButton))

    const isLoadingReturns =
      screen.getByTestId('isLoadingReturns').props.children
    const isAuthenticated = screen.getByTestId('isAuthenticated').props.children
    const error = screen.getByTestId('error').props.children
    const loggedUser = screen.getByTestId('loggedUser').props.children

    expect(isLoadingReturns).toHaveLength(2)
    expect(isLoadingReturns[0]).toBeTruthy()
    expect(isLoadingReturns[1]).toBeFalsy()
    expect(isAuthenticated).toBeTruthy()
    expect(error).toBeUndefined()
    expect(JSON.parse(loggedUser)).toEqual(mockedUser)
  })

  it('Should return LoginError', async () => {
    render(
      <AuthProvider loginUsecase={usecase}>
        <TestingComponent />
      </AuthProvider>
    )
    usecase.execute.mockResolvedValue(LoginError)

    const loginButton = screen.getByTestId('loginButton')

    await act(() => fireEvent.press(loginButton))

    const isLoadingReturns =
      screen.getByTestId('isLoadingReturns').props.children
    const isAuthenticated = screen.getByTestId('isAuthenticated').props.children
    const error = screen.getByTestId('error').props.children
    const loggedUser = screen.getByTestId('loggedUser').props.children

    expect(isLoadingReturns).toHaveLength(2)
    expect(isLoadingReturns[0]).toBeTruthy()
    expect(isLoadingReturns[1]).toBeFalsy()
    expect(isAuthenticated).toBeFalsy()
    expect(error).toEqual(LoginError.message)
    expect(loggedUser).toBeUndefined()
  })
})
