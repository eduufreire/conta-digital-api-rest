import z from 'zod'

export async function checkBodyIsValid(req, res) {
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
    return _body.data
  }
}
