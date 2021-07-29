import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { CreateUserUseCase, UpdateUserUseCase } from '@/modules/users/use-cases'

export class UserController {
  async create (request: Request, response: Response) {
    const data = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const user = await createUserUseCase.execute(data)

    return response.json({
      user,
    })
  }

  async update (request: Request, response: Response) {
    const data = request.body
    const { user_id } = request.params

    const updateUserUseCase = container.resolve(UpdateUserUseCase)

    const user = await updateUserUseCase.execute({
      user_id,
      ...data,
    })

    return response.json({
      user,
    })
  }
}
