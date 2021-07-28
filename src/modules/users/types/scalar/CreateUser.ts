import { Joi } from 'celebrate'

export type CreateUser = {
  full_name: string
  email: string
  password: string
}

export const createUser = {
  full_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8),
}
