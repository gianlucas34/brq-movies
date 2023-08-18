import { UserModel } from '../../models/UserModel'

export interface ILoginDatasource {
  login(): Promise<UserModel>
}
