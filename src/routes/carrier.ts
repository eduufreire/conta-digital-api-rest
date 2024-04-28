import express from 'express'
import { CarrierService } from '../services/carrier'
import { checkBodyCreateIsValid } from '../middlewares/checkBodyCreateIsValid'
import { checkBodyUpdateIsValid } from '../middlewares/checkBodyUpdateIsValid'
import { ICarrierData, ICarrierStatusChange } from '../interfaces/carrier/ICarrier'
import { CarrierModel } from '../models/carrier'
import { AccountService } from '../services/account'
import { AccountModel } from '../models/account'

const router = express.Router()

const accountModel = new AccountModel()

const carrierService = new CarrierService(
  new CarrierModel(),
  new AccountService(accountModel),
)

router.post('/', async (req, res) => {
  try {
    const bodyData = checkBodyCreateIsValid(req, res)

    let carrierData: ICarrierData
    if (bodyData !== undefined) {
      carrierData = {
        cpf: bodyData.cpf,
        nome: bodyData.nome,
      }

      await carrierService.create(carrierData)
    }

    res.status(201).send({
      message: 'Created carrier',
    })

  } catch (err) {
    res.status(400).send({
      error: err.message,
    })
  }
})

router.put('/status-change', async (req, res) => {
  try {
    const bodyData = checkBodyUpdateIsValid(req, res)

    let carrierStatusChange: ICarrierStatusChange
    if(bodyData !== undefined){
      carrierStatusChange = {
        cpf: bodyData?.cpf,
        action: bodyData?.action,
      }

      await carrierService.statusChange(carrierStatusChange)
    }

    res.status(201).send()

  } catch (err) {
    res.status(404).send({
      error: err.message,
    })
  }
})

export default router
