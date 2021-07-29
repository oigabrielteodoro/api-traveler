import { Joi } from 'celebrate'

import { CreateUser } from './CreateUser'

export type UpdateUser = {
  user_id?: string
} & Partial<Pick<CreateUser, 'email' | 'full_name'>>

export const updateUser = {
  full_name: Joi.string().optional().trim().pattern(/ /),
  email: Joi.string().email(),
}
