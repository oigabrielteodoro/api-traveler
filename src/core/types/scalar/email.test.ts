import { fromEither } from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

import { mapAll, getErrorMessage } from '@/config'

import { emailCodec, emailErrorMessage } from './email'

it('should valid email correctly', async () => {
  return pipe(
    'johndoe@example.com',
    emailCodec.decode,
    fromEither,
    mapAll((result) => expect(result).toBe('johndoe@example.com')),
  )
})

it('should return error when email is invalid', async () => {
  return pipe(
    'invalid-email',
    emailCodec.decode,
    fromEither,
    mapAll((errors) => expect(getErrorMessage(errors)).toBe(emailErrorMessage)),
  )
})
