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
    let carrierData: ICarrierData = {
      cpf: request.body.cpf,
      nome: request.body.nome,
    }

    await carrierService.create(carrierData)

    response.status(201).send({
      message: 'Created carrier',
    })
  }
)


router.put(
  '/status-change',
  checkBodyUpdateIsValid,
  async (request: Request, response: Response) => {

    let carrierStatusChange: IStatusChange = {
      cpf: request.body.cpf,
      action: request.body?.action,
    }

    await carrierService.statusChange(carrierStatusChange)

    response.status(201).send()
  }
)

export default router
