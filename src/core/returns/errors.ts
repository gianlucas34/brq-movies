export const NoConnectionError = new Error('Não há conexão com a internet!', {
  cause: 'CustomError',
})
export const DatasourceError = new Error(
  'Algo deu errado! Entre em contato com o suporte.',
  {
    cause: 'CustomError',
  }
)
export const InternalError = new Error(
  'O servidor encontrou uma situação com a qual não sabe lidar!',
  {
    cause: 'CustomError',
  }
)
