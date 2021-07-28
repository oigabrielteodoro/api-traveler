import { hash, compare } from 'bcryptjs'
import { HashProvider } from '../models'

export class BCryptHashProvider implements HashProvider {
  async generateHash (value: string) {
    const hashed = await hash(value, 10)

    return hashed
  }

  async compareHash (value: string, hashed: string) {
    return compare(value, hashed)
  }
}
