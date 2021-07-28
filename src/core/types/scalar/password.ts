import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type PasswordBrand = {
  readonly Password: unique symbol
}

export const passwordErrorMessage = 'Password should be at least 8 characters.'

export const passwordCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, PasswordBrand> => value.length >= 8,
    'Password',
  ),
  () => passwordErrorMessage,
)

export type Password = t.TypeOf<typeof passwordCodec>
