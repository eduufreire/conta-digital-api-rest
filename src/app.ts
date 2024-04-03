import express from 'express'
import morgan from 'morgan'
import carriers from './routes/carrier.ts'
import accounts from './routes/account.ts'

const app = express()

// config server
app.use(express.json())
app.use(morgan('dev'))

// routes modules
app.use('/carriers', carriers)
app.use('/accounts', accounts)

app.listen(9999, () => {
  console.log('HTTP Server Running')
})
