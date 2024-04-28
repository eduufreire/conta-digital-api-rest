import z from 'zod'
import { ICarrierData } from '../interfaces/carrier/ICarrier'

export function checkBodyCreateIsValid(req, res): ICarrierData | undefined {
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
    const dados: ICarrierData = {
      cpf: _body.data.cpf,
      nome: _body.data.nome,
    }

    return dados
  }
}
