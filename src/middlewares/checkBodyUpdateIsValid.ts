import z from 'zod'
import { IStatusChange } from '../interfaces/carrier/ICarrier'

export function checkBodyUpdateIsValid(req, res): IStatusChange | undefined {

  const bodyUpdateSchema = z.object({
    cpf: z.string().max(11),
    action: z.enum(['enable', 'disable']),
  })

  const _body = bodyUpdateSchema.safeParse(req.body)

  if (!_body.success) {
    res.status(400).send({
      error: _body.error.issues[0],
    })
  } else {
    const dados: IStatusChange = {
      cpf: _body.data.cpf,
      action: _body.data.action,
    }

    return dados
  }
}
