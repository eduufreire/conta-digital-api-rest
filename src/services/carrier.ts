import { CPF } from '@julioakira/cpf-cnpj-utils'
import { CarrierData, CarrierStatusChange } from '../interfaces/Carrier'
import { CarrierRepository } from '../interfaces/CarrierRepository'
import { AccountService } from '../services/account'

class CarrierService {
  _carrierRepository: CarrierRepository
  _accountService: AccountService

  constructor(
    carrierRepository: CarrierRepository,
    accountService: AccountService,
  ) {
    this._carrierRepository = carrierRepository
    this._accountService = accountService
  }

  async create(carrierData: CarrierData) {
    carrierData.cpf = this.cpfValidate(carrierData.cpf)

    await this._carrierRepository.create(carrierData)
    await this._accountService.create(carrierData.cpf)
  }

  async statusChange(carrierStatusChange: CarrierStatusChange) {
    carrierStatusChange.cpf = this.cpfValidate(carrierStatusChange.cpf)

    this._carrierRepository.statusChange(carrierStatusChange)
    await this._accountService.statusChange(carrierStatusChange)
  }

  private cpfValidate(cpf: string): string {
    const cpfFormated = CPF.Strip(cpf)
    const cpfValid = CPF.Validate(cpfFormated)
    if (!cpfValid) {
      throw new Error('CPF is not valid')
    }
    return cpfFormated
  }
}

export { CarrierService }
