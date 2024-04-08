import { z } from 'zod'

export function checkBodyTransaction(req, res) {
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
    return _body.data
  }
}
