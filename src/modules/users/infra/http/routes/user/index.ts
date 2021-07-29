import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import { createUser, updateUser } from '@/modules/users/types'
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

userRouter.put(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: updateUser,
  }),
  userController.update,
)
