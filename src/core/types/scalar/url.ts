import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

import { constFalse, constTrue, pipe } from 'fp-ts/function'
import { tryCatch, fold, toError } from 'fp-ts/Either'

type UrlBrand = {
  readonly Url: unique symbol
}

export const urlErrorMessage = 'Invalid URL'

export const urlCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, UrlBrand> => isUrl(value),
    'Url',
  ),
  () => urlErrorMessage,
)

export type Url = t.TypeOf<typeof urlCodec>

function isUrl (value: unknown) {
  return pipe(
    tryCatch(
      () => new URL(typeof value === 'string' ? value : ''),
      toError,
    ),
    fold(constFalse, constTrue),
  )
}
