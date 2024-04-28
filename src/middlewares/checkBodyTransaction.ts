import { z } from 'zod'
import { IPayloadTransaction } from '../interfaces/transaction/ITransaction'

export function checkBodyTransaction(req, res): IPayloadTransaction | undefined {
  const checkTransactionBody = z.object({
    cpf: z.string().max(11),
    type: z.enum(['withdraw', 'deposit']),
    amount: z.number(),
  })

  const _body = checkTransactionBody.safeParse(req.body)

  if (!_body.success) {
    res.status(400).send({
      error: _body.error.issues[0],
    })
  } else {

    let payload: IPayloadTransaction = {
      cpf: _body.data.cpf,
      type: _body.data.type,
      amount: _body.data.amount
    }

    return payload
  }
}
