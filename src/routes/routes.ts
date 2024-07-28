import express from 'express'
import carriers from './carrier'
import accounts from './account'

const router = express.Router()

// routes modules
router.use('/carriers', carriers)
router.use('/accounts', accounts)

export default router