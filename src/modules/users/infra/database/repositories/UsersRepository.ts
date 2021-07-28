import { Repository, getRepository } from 'typeorm'

import { User, IUsersRepository, CreateUser } from '@/modules/users'

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor () {
    this.ormRepository = getRepository(User)
  }

  async create (data: CreateUser) {
    const user = this.ormRepository.create(data)

    await this.ormRepository.save(user)

    return user
  }

  async findById (id: string) {
    return this.ormRepository.findOne(id)
  }

  async findByEmail (email: string) {
    return this.ormRepository.findOne({ email })
  }

  async delete (id: string) {
    this.ormRepository.delete(id)
  }

  async save (user: User) {
    return this.ormRepository.save(user)
  }
}
