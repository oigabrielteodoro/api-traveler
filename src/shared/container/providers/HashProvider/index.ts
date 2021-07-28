import { container } from 'tsyringe'

import { HashProvider } from './models'
import { BCryptHashProvider } from './implementations'

container.registerSingleton<HashProvider>('HashProvider', BCryptHashProvider)
