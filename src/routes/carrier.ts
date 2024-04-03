import express from 'express'
import { CarrierService } from '../services/carrier'
import { checkBodyIsValid } from '../middlewares/checkBodyIsValid'

const router = express.Router()
const carrierService = new CarrierService()

router.post('/', async (req, res) => {
  try {
    const bodyData = await checkBodyIsValid(req, res)

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

export default router
