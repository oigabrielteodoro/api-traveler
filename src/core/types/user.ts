import * as t from 'io-ts'

export const userCodec = t.type({
  email: t.string,
  name: t.string,
  password: t.string,
  avatar_url: t.string,
})

export type User = t.TypeOf<typeof userCodec>
