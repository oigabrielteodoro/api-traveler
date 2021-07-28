import { User } from '../infra/database/entities'

import { CreateUser } from './scalar/CreateUser'

type Create = (data: CreateUser) => Promise<User>
type Find<A> = (queryParam: A) => Promise<User | undefined>
type Delete = (id: string) => Promise<void>
type Save = (user: User) => Promise<User>

export type IUsersRepository = {
  create: Create
  findById: Find<string>
  findByEmail: Find<string>
  delete: Delete
  save: Save
}
