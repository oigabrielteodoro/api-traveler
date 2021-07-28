import express from 'express'

import '@/shared/infra/database'

const app = express()

app.use(express.json())

app.listen(process.env.APP_PORT)
