import express, { Request, Response } from 'express'

import { checkParamCpfIsValid } from '../middlewares/checkParamCpfIsValid'
import { AccountService } from '../services/account'
import { checkBodyUpdateIsValid } from '../middlewares/checkBodyUpdateIsValid'
import { checkBodyTransaction } from '../middlewares/checkBodyTransaction'
import { TransactionService } from '../services/transacoes'
import { IPayloadAccountBalance, ICheckExtractAccount, IResponseExtractAccount } from '../interfaces/account/IAccount'
import { AccountModel } from '../models/account'
import { TransactionModel } from '../models/transacoes'
import { checkDateIsValid } from '../middlewares/checkDateIsValid'
import { IStatusChange } from '../interfaces/carrier/ICarrier'



const router = express.Router()

const accountService = new AccountService(
  new AccountModel()
)

const transactionService = new TransactionService(
  new TransactionModel()
)


router.get(
  '/balance/:cpf',
  checkParamCpfIsValid,
  async (request: Request, response: Response) => {
    try {

      let result: IPayloadAccountBalance = await accountService.balance(request.params.cpf)
      response.status(200).send(result)

    } catch (err) {
      response.status(404).send({
        error: err.message,
      })
    }
  }
)

router.get(
  '/extract/:cpf',
  checkParamCpfIsValid,
  checkDateIsValid,
  async (request: Request, response: Response) => {
    try {

      let payloadExtractAccount: ICheckExtractAccount = {
        cpf: request.params.cpf,
        startDate: request.query.startDate,
        endDate: request.query.endDate,
      }

      const result: IResponseExtractAccount = await accountService.extractAccountBetweenDate(payloadExtractAccount)
      response.status(result.status).send(result.data)

    } catch (err) {
      response.status(err.status).send({
        error: err.message,
      })
    }
  }
)


router.put(
  '/status-change',
  checkBodyUpdateIsValid,
  async (request: Request, response: Response) => {
    try {

      let payload: IStatusChange = {
        action: request.body.action,
        cpf: request.body.cpf
      }
      await accountService.statusChange(payload)
      response.status(201).send()

    } catch (err) {
      response.status(err.status).send({
        error: err.message,
      })
    }
  }
)


router.post(
  '/transaction', 
  async (req, res) => {
  try {
    const bodyData = checkBodyTransaction(req, res)

    if (bodyData !== undefined) {
      await transactionService.create(bodyData)
      res.status(201).send()
    }

  } catch (err) {
    res.status(400).send({
      error: err.message,
    })
  }
})

router.get('/teste', () => {
  console.log('edu')
})

export default router
