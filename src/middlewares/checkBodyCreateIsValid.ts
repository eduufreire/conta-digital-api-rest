import z from 'zod'
import { CarrierData } from '../interfaces/Carrier'

export function checkBodyIsValid(req, res): CarrierData | undefined {
  const createCarrierBodySchema = z.object({
    cpf: z.string().max(11),
    nome: z.string(),
  })

  const _body = createCarrierBodySchema.safeParse(req.body)

  if (!_body.success) {
    res.status(400).send({
      error: _body.error.issues[0],
    })
  } else {
    const dados: CarrierData = {
      cpf: _body.data.cpf,
      nome: _body.data.nome,
    }

    return dados
  }
}
