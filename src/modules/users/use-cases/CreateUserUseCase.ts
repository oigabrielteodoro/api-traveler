import { inject, injectable } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { AppError } from '@/shared/errors'

import { HashProvider } from '@/shared/container/providers/HashProvider/models'

import { CreateUser, IUsersRepository } from '../types'

@injectable()
export class CreateUserUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: HashProvider,
  ) {}

  async execute (data: CreateUser) {
    const userWithEmail = await this.usersRepository.findByEmail(data.email)

    if (userWithEmail) {
      throw new AppError('User already exists with this email.', 403)
    }

    const passwordHashed = await this.hashProvider.generateHash(data.password)

    const user = await this.usersRepository.create({
      ...data,
      password: passwordHashed,
    })

    return classToClass(user)
  }
}
