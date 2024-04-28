import express from 'express'
import moment from 'moment-timezone'
import z from 'zod'

import { checkParamCpfIsValid } from '../middlewares/checkParamCpfIsValid'
import { AccountService } from '../services/account'
import { checkBodyUpdateIsValid } from '../middlewares/checkBodyUpdateIsValid'
import { checkBodyTransaction } from '../middlewares/checkBodyTransaction'
import { TransactionService } from '../services/transacoes'
import { IPayloadAccountBalance, ICheckExtractAccount } from '../interfaces/account/IAccount'
import { AccountModel } from '../models/account'
import { TransactionModel } from '../models/transacoes'



const router = express.Router()

const accountService = new AccountService(
  new AccountModel()
)

const transactionService = new TransactionService(
  new TransactionModel()
)


router.get('/balance/:cpf', async (req, res) => {
  try {
    const cpfValid = checkParamCpfIsValid(req, res)

    if (cpfValid !== undefined) {
      let result: IPayloadAccountBalance = await accountService.balance(cpfValid)
      res.status(200).send(result)
    }
  } catch (err) {
    res.status(404).send({
      error: err.message,
    })
  }
})

router.get('/extract/:cpf', async (req, res) => {
  try {
    const cpfValid = checkParamCpfIsValid(req, res)

    // validando se as datas passadas são validas
    const dateQueryParamsValid = z.coerce.date()
    const validDatestart = dateQueryParamsValid.safeParse(req.query.inicio,).success
    const validDateEnd = dateQueryParamsValid.safeParse(req.query.fim).success

    if (!validDatestart || !validDateEnd) {
      throw new Error('Invalid date')
    }

    if (cpfValid !== undefined) {

      let payloadExtractAccount: ICheckExtractAccount = {
        cpf: cpfValid,
        startDate: req.query.inicio,
        endDate: req.query.fim,
      }

      const response = await accountService.extractAccountBetweenDate(payloadExtractAccount)
      res.status(response.status).send(response.data)
    }

  } catch (err) {
    res.status(400).send({
      error: err.message,
    })
  }
})

router.put('/status-change', async (req, res) => {
  try {
    const bodyData = checkBodyUpdateIsValid(req, res)

    if (bodyData !== undefined) {
      await accountService.statusChange(bodyData)
      res.status(201).send()
    }
  } catch (err) {
    res.status(400).send({
      error: err.message,
    })
  }
})

router.post('/transaction', async (req, res) => {
  try {
    const bodyData = checkBodyTransaction(req, res)

    if(bodyData !== undefined){
      await transactionService.create(bodyData)
      res.status(201).send()
    }

  } catch (err) {
    res.status(400).send({
      error: err.message,
    })
  }
})

export default router
