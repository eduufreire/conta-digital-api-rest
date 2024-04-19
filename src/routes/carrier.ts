import express from 'express'
import { CarrierService } from '../services/carrier'
import { checkBodyIsValid } from '../middlewares/checkBodyCreateIsValid'
import { checkBodyUpdateIsValid } from '../middlewares/checkBodyUpdateIsValid'
import { CarrierData, CarrierStatusChange } from '../interfaces/Carrier'
import { CarrierModel } from '../models/carrier'
import { AccountService } from '../services/account'

const router = express.Router()
const carrierService = new CarrierService(
  new CarrierModel(),
  new AccountService(),
)

router.post('/', async (req, res) => {
  try {
    const bodyData = checkBodyIsValid(req, res)

    let carrierData: CarrierData
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

    let carrierStatusChange: CarrierStatusChange
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
