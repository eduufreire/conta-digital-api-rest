import z from 'zod'

export function checkParamCpfIsValid(req, res) {
  const schemaParam = z.string().max(11)

  const _param = schemaParam.safeParse(req.params.cpf)

  if (!_param.success) {
    res.status(401).send({
      error: _param.error.issues[0],
    })
  } else {
    return _param.data
  }
}
