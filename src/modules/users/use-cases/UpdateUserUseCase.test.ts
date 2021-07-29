import { AppError } from '@/shared/errors'

import { FakeUsersRepository } from '../fakes'
import { CreateUser, IUsersRepository } from '../types'

import { UpdateUserUseCase } from './UpdateUserUseCase'

let fakeUsersRepository: IUsersRepository
let updateUserUseCase: UpdateUserUseCase

const data: CreateUser = {
  full_name: 'John Doe',
  email: 'john@doe.com',
  password: '123456789',
}

describe('UpdateUserUseCase', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    updateUserUseCase = new UpdateUserUseCase(fakeUsersRepository)
  })

  it('should be able update user correctly', async () => {
    const { id: user_id } = await fakeUsersRepository.create(data)

    const user = await updateUserUseCase.execute({
      user_id,
      email: 'user@example.com',
      full_name: 'User Example',
    })

    expect(user.email).toBe('user@example.com')
  })

  it('should not be able update user when user_id is empty', async () => {
    await expect(updateUserUseCase.execute({
      email: 'user@example.com',
      full_name: 'User Example',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update user when email already exists', async () => {
    await fakeUsersRepository.create({ ...data, email: 'user@example.com' })

    const user = await fakeUsersRepository.create(data)

    Object.assign(user, {
      email: 'user@example.com',
    })

    await fakeUsersRepository.save(user)

    await expect(updateUserUseCase.execute(data)).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update user when user not registred', async () => {
    await expect(updateUserUseCase.execute({
      user_id: 'wrong-user-id',
      email: 'user@example.com',
      full_name: 'User Example',
    })).rejects.toBeInstanceOf(AppError)
  })
})
