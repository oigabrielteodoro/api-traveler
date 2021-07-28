import express from 'express'

import { errors } from 'celebrate'

import { getAppErrors } from '@/shared/errors'

import 'express-async-errors'

import '@/shared/infra/database'
import '@/shared/container'

import routes from './routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.use(errors())
app.use(getAppErrors)

app.listen(process.env.APP_PORT, () => {
  console.log('Server is running 🚀')
})
