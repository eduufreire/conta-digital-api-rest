import express from 'express'
import { checkParamCpfIsValid } from '../middlewares/checkParamCpfIsValid'
import { AccountService } from '../services/account'
import { checkBodyUpdateIsValid } from '../middlewares/checkBodyUpdateIsValid'
import { checkBodyTransaction } from '../middlewares/checkBodyTransaction'

import moment from 'moment-timezone'
import { TransactionService } from '../services/transacoes'

const router = express.Router()
const accountService = new AccountService()
const transactionService = new TransactionService()

router.get('/balance/:cpf', async (req, res) => {
  try {
    const cpfValid = checkParamCpfIsValid(req, res)
    let result
    if (cpfValid !== undefined) {
      result = await accountService.balance(cpfValid)
    }
    res.status(200).send(result)
  } catch (err) {
    res.status(404).send({
      error: err.message,
    })
  }
})

router.put('/status-change', async (req, res) => {
  try {
    const bodyData = checkBodyUpdateIsValid(req, res)

    if (bodyData !== undefined) {
      await accountService.statusChange(bodyData)
    }
    res.status(201).send()
  } catch (err) {
    res.status(400).send({
      error: err.message,
    })
  }
})

router.post('/transaction', async (req, res) => {
  try {
    const bodyData = checkBodyTransaction(req, res)
    await transactionService.create(bodyData)
    res.status(200).send('ok')
  } catch (err) {
    res.status(400).send({
      error: err.message,
    })
  }
})

router.get('/teste', (req, res) => {
  console.log(moment.tz('America/Sao_Paulo').format('YYYY-MM-DD'))
})

export default router
