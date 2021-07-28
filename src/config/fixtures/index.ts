import { pipe } from 'fp-ts/function'
import { map, mapLeft, TaskEither } from 'fp-ts/TaskEither'

export function unsafe <T> (value: unknown): T {
  return value as T
}

type Callback = (result: unknown) => unknown;
type MapAll = (
  fn: Callback
) => (data: TaskEither<unknown, unknown>) => TaskEither<unknown, unknown>;

export const mapAll: MapAll = (fn) => (data) => {
  return pipe(data, map(fn), mapLeft(fn))
}

export function getErrorMessage (errors: unknown): string {
  return Array.isArray(errors) ? errors[0].message : ''
}
