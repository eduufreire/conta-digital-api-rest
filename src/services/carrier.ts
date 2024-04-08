import { CPF } from '@julioakira/cpf-cnpj-utils'
import { CarrierModel } from '../models/carrier'
import { AccountService } from '../services/account'

const carrierModel = new CarrierModel()
const accountService = new AccountService()

class CarrierService {
  async create(carrierDTO) {
    carrierDTO.cpf = this.cpfValidate(carrierDTO.cpf)

    await carrierModel.create(carrierDTO)
    await accountService.create(carrierDTO.cpf)
  }

  async statusChange(carrierDTO) {
    carrierDTO.cpf = this.cpfValidate(carrierDTO.cpf)
    carrierDTO.action = carrierDTO.action === 'enable' ? 1 : 0
    await carrierModel.statusChange(carrierDTO)
    await accountService.statusChange(carrierDTO)
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

export { CarrierService }
