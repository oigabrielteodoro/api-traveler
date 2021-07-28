import { v4 as uuid } from 'uuid'

import { User } from '../infra/database'

import { CreateUser, IUsersRepository } from '../types'

export class FakeUsersRepository implements IUsersRepository {
  private users: User[]

  constructor () {
    this.users = []
  }

  async create (data: CreateUser) {
    const user = new User()

    Object.assign(user, {
      id: uuid,
      ...data,
    })

    this.users.push(user)

    return user
  }

  async findById (id: string) {
    return this.users.find(user => user.id === id)
  }

  async findByEmail (email: string) {
    return this.users.find(user => user.email === email)
  }

  async delete (id: string) {
    this.users = this.users.filter(user => user.id !== id)
  }

  async save ({ id, ...rest }: User) {
    const userIndex = this.users.findIndex(user => user.id === id)

    const data = {
      id,
      ...rest,
    }

    this.users[userIndex] = data

    return data
  }
}
