import express from 'express'
import z from 'zod'
import { PortadorService } from '../services/portador'
import { PortadorModel } from '../models/portador'

const router = express.Router()
const portadorModel = new PortadorModel()
const portadorService = new PortadorService(portadorModel)

router.post('/', async (req, res) => {
  try {
    const createPortadoresBodySchema = z.object({
      cpf: z.string().max(11),
      nome: z.string(),
    })

    let bodyData
    const _body = createPortadoresBodySchema.safeParse(req.body)

    if (!_body.success) {
      res.status(400).send({
        error: _body.error.issues[0],
      })
    } else {
      bodyData = _body.data
    }

    const portadorDTO = {
      cpf: bodyData.cpf,
      nome: bodyData.nome,
    }

    await portadorService.create(portadorDTO)
    res.status(201).send({
      message: 'Created portador',
    })
  } catch (err) {
    res.status(400).send({
      error: err.message,
    })
  }
})

export default router
