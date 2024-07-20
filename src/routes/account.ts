import express, { Request, Response } from 'express'
import { checkParamCpfIsValid } from '../middlewares/checkParamCpfIsValid'
import { AccountService } from '../services/account'
import { checkBodyUpdateIsValid } from '../middlewares/checkBodyUpdateIsValid'
import { checkBodyTransaction } from '../middlewares/checkBodyTransaction'
import { TransactionService } from '../services/transaction'
import { IPayloadAccountBalance, ICheckExtractAccount, IExtractAccount } from '../interfaces/account/IAccount'
import { AccountModel } from '../models/account'
import { TransactionModel } from '../models/transaction'
import { checkDateIsValid } from '../middlewares/checkDateIsValid'
import { IStatusChange } from '../interfaces/carrier/ICarrier'
import { IPayloadTransaction } from '../interfaces/transaction/ITransaction'


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

      const result: Array<IExtractAccount> = await accountService.extractAccountBetweenDate(payloadExtractAccount)
      response.status(200).send(result)

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
  checkBodyTransaction,
  async (request: Request, response: Response) => {
    try {
      let payload: IPayloadTransaction = {
        cpf: request.body.cpf,
        type: request.body.type,
        amount: request.body.amount
      }

      await transactionService.create(payload)
      response.status(201).send()
    } catch (err) {
      response.status(400).send({
        error: err.message,
      })
    }
  }
)

export default router
