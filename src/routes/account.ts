import express from 'express'
import { checkParamCpfIsValid } from '../middlewares/checkParamCpfIsValid'
import { AccountService } from '../services/account'

const router = express.Router()
const accountService = new AccountService()

router.get('/balance/:cpf', async (req, res) => {
  try {
    const cpfValid = await checkParamCpfIsValid(req, res)
    let result
    if (cpfValid !== undefined) {
      result = await accountService.balance(cpfValid)
    }
    res.status(200).send(result)
  } catch (err) {
    res.status(400).send({
      error: err.message,
    })
  }
})

export default router
