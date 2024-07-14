import { ICarrierData, IStatusChange, IPayloadStatusChange } from '../interfaces/carrier/ICarrier'
import { ICarrierRepository } from '../interfaces/carrier/ICarrierRepository'
import { AccountService } from '../services/account'
import { cpfValidate } from '../utils/CpfValidate'


class CarrierService {

  _carrierRepository: ICarrierRepository
  _accountService: AccountService

  constructor(
    carrierRepository: ICarrierRepository,
    accountService: AccountService,
  ) {
    this._carrierRepository = carrierRepository
    this._accountService = accountService
  }

  async create(carrierData: ICarrierData) {
    carrierData.cpf = cpfValidate(carrierData.cpf)
    await this._carrierRepository.create(carrierData)
    await this._accountService.create(carrierData.cpf)
  }

  async statusChange(carrierStatusChange: IStatusChange) {
    let cfpValidate: string = cpfValidate(carrierStatusChange.cpf)
    let checkAction: 0 | 1 = carrierStatusChange.action == 'disable' ? 0 : 1

    const payload: IPayloadStatusChange = {
      cpf: cfpValidate,
      action: checkAction
    }

    await this._carrierRepository.statusChange(payload)
    await this._accountService.statusChange(carrierStatusChange)
  }

}

export { CarrierService }
