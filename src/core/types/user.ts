import * as t from 'io-ts'

import { emailCodec } from '@/core/types/scalar/email'

export const userCodec = t.type({
  email: emailCodec,
  name: t.string,
  password: t.string,
  avatar_url: t.string,
})

export type User = t.TypeOf<typeof userCodec>
