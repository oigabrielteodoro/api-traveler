import { pipe } from 'fp-ts/function'
import { fromEither } from 'fp-ts/lib/TaskEither'

import { getErrorMessage, mapAll } from '@/config'

import { urlCodec, urlErrorMessage } from './url'

it('should valid url correctly', async () => {
  return pipe(
    'https://google.com',
    urlCodec.decode,
    fromEither,
    mapAll(result => expect(result).toBe('https://google.com')),
  )()
})

it('should return error when url is invalid', async () => {
  return pipe(
    'invalid-url',
    urlCodec.decode,
    fromEither,
    mapAll(errors => expect(getErrorMessage(errors)).toBe(urlErrorMessage)),
  )()
})
