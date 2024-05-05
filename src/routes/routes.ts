import express from 'express'
import carriers from './carrier.ts'
import accounts from './account.ts'

const router = express.Router()

// routes modules
router.use('/carriers', carriers)
router.use('/accounts', accounts)

export default router