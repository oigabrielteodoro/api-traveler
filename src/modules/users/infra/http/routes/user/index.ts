import { Router } from 'express'
import { celebrate, Segments } from 'celebrate'

import { createUser } from '@/modules/users/types'
import { UserController } from '@/modules/users/infra/http/controllers'

export const userRouter = Router()

const userController = new UserController()

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: createUser,
  }),
  userController.create,
)
