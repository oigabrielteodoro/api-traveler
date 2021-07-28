import * as t from 'io-ts'

import { emailCodec, passwordCodec, urlCodec } from '@/core/types/scalar'

export const userCodec = t.type({
  email: emailCodec,
  name: t.string,
  password: passwordCodec,
  avatar_url: urlCodec,
})

export type User = t.TypeOf<typeof userCodec>
