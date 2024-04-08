import z from 'zod'

export function checkBodyUpdateIsValid(req, res) {
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
    return _body.data
  }
}
