import { ICarrierData, IStatusChange, IPayloadStatusChange } from '../interfaces/carrier/ICarrier'
import { ICarrierRepository } from '../interfaces/carrier/ICarrierRepository'
import { AccountService } from '../services/account'
import { cpfValidate } from '../utils/CpfValidate'


class CarrierService {

  constructor(
    private carrierRepository: ICarrierRepository,
    private accountService: AccountService,
  ) { }

  async create(
    carrierData: ICarrierData
  ): Promise<void> {

    carrierData.cpf = cpfValidate(carrierData.cpf)
    await this.carrierRepository.create(carrierData)
    await this.accountService.create(carrierData.cpf)

  }

  async statusChange(
    carrierStatusChange: IStatusChange
  ): Promise<void> {

    let cfpValidate: string = cpfValidate(carrierStatusChange.cpf)
    let checkAction: 0 | 1 = carrierStatusChange.action == 'disable' ? 0 : 1

    const payload: IPayloadStatusChange = {
      cpf: cfpValidate,
      action: checkAction
    }

    await this.carrierRepository.statusChange(payload)
    await this.accountService.statusChange(carrierStatusChange)

  }

}

export { CarrierService }
