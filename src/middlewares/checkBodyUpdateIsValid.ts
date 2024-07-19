import { NextFunction, Request, Response } from 'express'
import z from 'zod'

export function checkBodyUpdateIsValid(
  request: Request, response: Response, next: NextFunction
): void {

  const bodyUpdateSchema = z.object({
    cpf: z.string().max(11),
    action: z.enum(['enable', 'disable']),
  })

  const _body = bodyUpdateSchema.safeParse(request.body)

  if (!_body.success) {
    response.status(400).send({
      error: _body.error.issues[0],
    })
  }

  next()

}
