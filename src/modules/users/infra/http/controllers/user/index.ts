import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { CreateUserUseCase } from '@/modules/users/use-cases'

export class UserController {
  async create (request: Request, response: Response) {
    const data = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const user = await createUserUseCase.execute(data)

    return response.json({
      user,
    })
  }
}
