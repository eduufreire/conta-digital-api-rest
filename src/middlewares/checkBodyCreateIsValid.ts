import { NextFunction, Request, Response } from 'express'
import z from 'zod'

export function checkBodyCreateIsValid(
  request: Request, response: Response, next: NextFunction
) {

  const createCarrierBodySchema = z.object({
    cpf: z.string().max(11),
    nome: z.string(),
  })

  const _body = createCarrierBodySchema.safeParse(request.body)

  if (!_body.success) {
    response.status(400).send({
      error: _body.error.issues[0],
    })
  }

  next()
}
