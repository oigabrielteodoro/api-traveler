import { inject, injectable } from 'tsyringe'

import { AppError } from '@/shared/errors'

import { CreateUser, IUsersRepository } from '../types'

@injectable()
export class CreateUserUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute (data: CreateUser) {
    const userWithEmail = await this.usersRepository.findByEmail(data.email)

    if (userWithEmail) {
      throw new AppError('User already exists with this email.', 403)
    }

    const user = await this.usersRepository.create(data)

    return user
  }
}
