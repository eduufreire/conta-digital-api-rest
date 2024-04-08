import express from 'express'
import { CarrierService } from '../services/carrier'
import { checkBodyIsValid } from '../middlewares/checkBodyCreateIsValid'
import { checkBodyUpdateIsValid } from '../middlewares/checkBodyUpdateIsValid'

const router = express.Router()
const carrierService = new CarrierService()

router.post('/', async (req, res) => {
  try {
    const bodyData = checkBodyIsValid(req, res)

    let carrierDTO
    if (bodyData !== undefined) {
      carrierDTO = {
        cpf: bodyData.cpf,
        nome: bodyData.nome,
      }
    }

    await carrierService.create(carrierDTO)
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

    const carrierDTO = {
      cpf: bodyData?.cpf,
      action: bodyData?.action,
    }

    await carrierService.statusChange(carrierDTO)
    res.status(201).send()
  } catch (err) {
    res.status(404).send({
      error: err.message,
    })
  }
})

export default router
