import { HashProvider } from '../models'

export class FakeHashProvider implements HashProvider {
  async generateHash (value: string) {
    return value
  }

  async compareHash (value: string, hashed: string) {
    return value === hashed
  }
}
