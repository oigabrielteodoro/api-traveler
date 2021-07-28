import { pipe } from 'fp-ts/function'
import { fromEither } from 'fp-ts/lib/TaskEither'

import { getErrorMessage, mapAll } from '@/config'

import { passwordCodec, passwordErrorMessage } from './password'

it('should validate password property', async () => {
  return pipe(
    '12345678',
    passwordCodec.decode,
    fromEither,
    mapAll(result => expect(result).toBe('12345678')),
  )()
})

it('should not accept a password less then 8 characters long', async () => {
  return pipe(
    '12345',
    passwordCodec.decode,
    fromEither,
    mapAll(errors => expect(getErrorMessage(errors)).toBe(passwordErrorMessage)),
  )()
})
