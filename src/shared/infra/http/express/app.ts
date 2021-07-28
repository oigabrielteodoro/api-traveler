import express from 'express'

import '@/shared/infra/database'
import '@/shared/container'

const app = express()

app.use(express.json())

app.listen(process.env.APP_PORT, () => {
  console.log('Server is running 🚀')
})
