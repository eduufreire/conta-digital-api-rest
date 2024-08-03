import 'express-async-errors'
import express from 'express'
import morgan from 'morgan'

import router from './routes/routes'
import { errorMiddleware } from './middlewares/errorMiddleware'

export const app = express()

// config server
app.use(express.json())
app.use(morgan('dev'))

app.use(router)

app.use(errorMiddleware)