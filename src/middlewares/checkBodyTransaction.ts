import { z } from 'zod'
import { NextFunction, Request, Response } from 'express'

export function checkBodyTransaction(
  request: Request, response: Response, next: NextFunction
): void {

  const checkTransactionBody = z.object({
    cpf: z.string().max(11),
    type: z.enum(['withdraw', 'deposit']),
    amount: z.number(),
  })

  const _body = checkTransactionBody.safeParse(request.body)

  if (!_body.success) {
    response.status(400).send({
      error: _body.error.issues[0],
    })
  }

  next()

}
