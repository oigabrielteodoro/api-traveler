import { fromEither, chain, tryCatch, TaskEither } from 'fp-ts/TaskEither'
import { toError } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import { CreateUser } from '@/core/types/user'
import { validateUser } from './validateUser'

export type OutsideRegister<A> = (data: CreateUser) => Promise<A>
export type Register = <A>(outsideRegister: OutsideRegister<A>) => (data: CreateUser) => TaskEither<Error, A>

export const register: Register = (outsideRegister) => (data) => {
  return pipe(
    data,
    validateUser,
    fromEither,
    chain(() => tryCatch(
      () => outsideRegister(data),
      toError,
    )),
  )
}
