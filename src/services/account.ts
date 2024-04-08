import { CPF } from '@julioakira/cpf-cnpj-utils'
import { AccountModel } from '../models/account'

const accountModel = new AccountModel()

class AccountService {
  async create(cpf: string) {
    const accountData = {
      fkCpf: cpf,
      number: cpf.substring(0, 3),
      agency: '1001',
      balance: 0.0,
      isActive: 1,
    }

    await accountModel.create(accountData)
  }

  async balance(cpf: string) {
    const cpfFormated = this.checkCpfIsValid(cpf)
    return await accountModel.consultBalance(cpfFormated)
  }

  async statusChange(dataUpdate) {
    dataUpdate.cpf = this.checkCpfIsValid(dataUpdate.cpf)
    dataUpdate.action = dataUpdate.action === 'enable' ? 1 : 0
    await accountModel.statusChange(dataUpdate)
  }

  private checkCpfIsValid(cpf: string) {
    const cpfFormated = CPF.Strip(cpf)
    const cpfValid = CPF.Validate(cpfFormated)

    if (!cpfValid) {
      throw new Error('CPF is not valid')
    }
    return cpfFormated
  }
}

export { AccountService }
