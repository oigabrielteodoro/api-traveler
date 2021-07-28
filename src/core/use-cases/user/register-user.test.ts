import { pipe } from 'fp-ts/function'

import { mapAll, unsafe } from '@/config'
import { CreateUser } from '@/core/types/user'
import { emailErrorMessage, passwordErrorMessage } from '@/core/types/scalar'

import { register, OutsideRegister } from './register-user'

const onRegisterSuccess: OutsideRegister<string> = async (data) => {
  return `User ${data.name} registred with success`
}

const onRegisterFailure: OutsideRegister<never> = () => {
  throw new Error('External Server Error')
}

const data: CreateUser = {
  name: 'John Doe',
  password: unsafe('12345678'),
  email: unsafe('johndoe@example.com'),
}

const dataWithWrongEmail: CreateUser = {
  name: 'John Doe',
  password: unsafe('123456789'),
  email: unsafe('wrong-email'),
}

const dataWithWrongEmailAndPassword: CreateUser = {
  name: 'John Doe',
  password: unsafe('123456'),
  email: unsafe('wrong-email'),
}

it('should register user with success', async () => {
  return pipe(
    data,
    register(onRegisterSuccess),
    mapAll(result => expect(result).toBe(`User ${data.name} registred with success`)),
  )()
})

it('should not accept a register from a user with invalid email', async () => {
  return pipe(
    dataWithWrongEmail,
    register(onRegisterSuccess),
    mapAll(error => expect(error).toEqual(new Error(emailErrorMessage))),
  )()
})

it('should not accept a register from a user with invalid email and/or password', async () => {
  return pipe(
    dataWithWrongEmailAndPassword,
    register(onRegisterSuccess),
    mapAll(error => expect(error).toEqual(new Error(`${passwordErrorMessage}:::${emailErrorMessage}`))),
  )()
})

it('should return a Left if register function throws an error', async () => {
  return pipe(
    data,
    register(onRegisterFailure),
    mapAll(error => expect(error).toEqual(new Error('External Server Error'))),
  )
})
