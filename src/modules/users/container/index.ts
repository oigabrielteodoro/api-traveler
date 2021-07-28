import { container } from 'tsyringe'

import { UsersRepository, IUsersRepository } from '@/modules/users'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
