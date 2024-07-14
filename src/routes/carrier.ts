import express, { Request, Response } from 'express'
import { CarrierService } from '../services/carrier'
import { checkBodyCreateIsValid } from '../middlewares/checkBodyCreateIsValid'
import { checkBodyUpdateIsValid } from '../middlewares/checkBodyUpdateIsValid'
import { ICarrierData, IStatusChange } from '../interfaces/carrier/ICarrier'
import { CarrierModel } from '../models/carrier'
import { AccountService } from '../services/account'
import { AccountModel } from '../models/account'

const router = express.Router()

const accountModel = new AccountModel()

const carrierService = new CarrierService(
  new CarrierModel(),
  new AccountService(accountModel),
)

router.post(
  '/',
  checkBodyCreateIsValid,
  async (request: Request, response: Response) => {

    try {
      let carrierData: ICarrierData = {
        cpf: request.body.cpf,
        nome: request.body.nome,
      }

      await carrierService.create(carrierData)

      response.status(201).send({
        message: 'Created carrier',
      })

    } catch (err) {
      response.status(err.status).send({
        error: err.message,
      })
    }
  })


router.put(
  '/status-change',
  checkBodyUpdateIsValid,
  async (request: Request, response: Response) => {
    try {

      let carrierStatusChange: IStatusChange = {
        cpf: request.body.cpf,
        action: request.body?.action,
      }

      await carrierService.statusChange(carrierStatusChange)
      response.status(201).send()

    } catch (err) {
      response.status(err.status).send({
        error: err.message,
      })
    }

  })

export default router
