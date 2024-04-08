import { CPF } from '@julioakira/cpf-cnpj-utils'
import { TransactionModel } from '../models/transacoes'

const transactionModel = new TransactionModel()

class TransactionService {
  async create(transaction) {
    transaction.cpf = this.cpfValidate(transaction.cpf)
    await transactionModel.create(transaction)
  }

  private cpfValidate(cpf: string) {
    const cpfFormated = CPF.Strip(cpf)
    const cpfValid = CPF.Validate(cpfFormated)
    if (!cpfValid) {
      throw new Error('CPF is not valid')
    }
    return cpfFormated
  }
}

export { TransactionService }
