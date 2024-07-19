import { NextFunction, Request, Response } from 'express'
import z from 'zod'

export function checkParamCpfIsValid(
  request: Request, response: Response, next: NextFunction
): void {
  const schemaParam = z.string().max(11)

  const _param = schemaParam.safeParse(request.params.cpf)

  if (!_param.success) {
    response.status(401).send({
      error: _param.error.issues[0],
    })
  }
  next()
}
