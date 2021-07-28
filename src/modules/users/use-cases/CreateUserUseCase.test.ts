import { FakeHashProvider } from '@/shared/container/providers/HashProvider/fakes'
import { HashProvider } from '@/shared/container/providers/HashProvider/models'

import { AppError } from '@/shared/errors'

import { FakeUsersRepository } from '../fakes'
import { CreateUser, IUsersRepository } from '../types'

import { CreateUserUseCase } from './CreateUserUseCase'

let hashProvider: HashProvider
let fakeUsersRepository: IUsersRepository
let createUserUseCase: CreateUserUseCase

const data: CreateUser = {
  full_name: 'John Doe',
  email: 'john@doe.com',
  password: '12345678',
}

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    hashProvider = new FakeHashProvider()
    fakeUsersRepository = new FakeUsersRepository()

    createUserUseCase = new CreateUserUseCase(fakeUsersRepository, hashProvider)
  })

  it('should be able create user correctly', async () => {
    const user = await createUserUseCase.execute(data)

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('full_name')
  })

  it('should not be able create user when email already exists', async () => {
    await fakeUsersRepository.create(data)

    await expect(createUserUseCase.execute(data)).rejects.toBeInstanceOf(AppError)
  })
})
