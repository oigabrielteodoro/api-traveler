import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type EmailBrand = {
  readonly Email: unique symbol;
};

export const emailErrorMessage = 'Invalid email.'

export function isEmail (value: string) {
  return /\w+.+?@\w+.+?$/.test(value)
}

export const emailCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, EmailBrand> => isEmail(value),
    'Email',
  ),
  () => emailErrorMessage,
)

export type Email = t.TypeOf<typeof emailCodec>;
