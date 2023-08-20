export const NoConnectionError = new Error('Não há conexão com a internet!', {
  cause: 'CustomError',
})
export const LoginError = new Error('Usuário e/ou senha incorreto(os)!', {
  cause: 'CustomError',
})
export const InternalError = new Error(
  'O servidor encontrou uma situação com a qual não sabe lidar!',
  {
    cause: 'CustomError',
  }
)
