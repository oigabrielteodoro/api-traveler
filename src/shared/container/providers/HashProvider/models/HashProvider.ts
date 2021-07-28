export type HashProvider = {
  generateHash(value: string): Promise<string>
  compareHash(payload: string, hashed: string): Promise<boolean>
}
