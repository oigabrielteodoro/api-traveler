import { inject, injectable } from 'tsyringe'

import { mapAll } from '@/lib'
import { AppError } from '@/shared/errors'

import { IUsersRepository, UpdateUser } from '../types'

@injectable()
export class UpdateUserUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute ({ user_id, ...data }: UpdateUser) {
    if (!user_id) {
      throw new AppError('Please, enter user id')
    }

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Invalid user. Please use a valid user id', 404)
    }

    Object.assign(user, mapAll(data))

    await this.usersRepository.save(user)

    return user
  }
}
