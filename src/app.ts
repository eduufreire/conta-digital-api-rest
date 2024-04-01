import express from 'express'
import morgan from 'morgan'
import portadores from './routes/portadores.ts'

const app = express()

// config server
app.use(express.json())
app.use(morgan('dev'))

// routes modules
app.use('/portadores', portadores)

app.listen(9999, () => {
  console.log('HTTP Server Running')
})
