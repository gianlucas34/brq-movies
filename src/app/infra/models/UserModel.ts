import { UserEntity } from '../../domain/entities/UserEntity'

export class UserModel implements UserEntity {
  name: string
  token: string

  constructor({ name, token }: { name: string; token: string }) {
    this.name = name
    this.token = token
  }

  fromJson = (): UserEntity => ({
    name: this.name,
    token: this.token,
  })
}
