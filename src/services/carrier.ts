import { CPF } from '@julioakira/cpf-cnpj-utils'
import { CarrierModel } from '../models/carrier'
import { AccountService } from '../services/account'

const carrierModel = new CarrierModel()
const accountService = new AccountService()

class CarrierService {
  async create(carrierDTO) {
    const cpfFormated = CPF.Strip(carrierDTO.cpf)
    const cpfValid = CPF.Validate(cpfFormated)
    carrierDTO.cpf = cpfFormated

    if (!cpfValid) {
      throw new Error('CPF is not valid')
    }

    await carrierModel.create(carrierDTO)
    await accountService.create(carrierDTO.cpf)
  }
}

export { CarrierService }
