import { knex } from '../database'
import { CustomException } from '../errorHandler'
import { ICarrierData, IPayloadStatusChange } from '../interfaces/carrier/ICarrier'
import { ICarrierRepository } from '../interfaces/carrier/ICarrierRepository'

class CarrierModel implements ICarrierRepository {

  async create(carrierData: ICarrierData) {
    await this.verifyCpfIsRegistred(carrierData.cpf)
    await knex('carrier').insert({
      name: carrierData.nome,
      cpf: carrierData.cpf,
      isActive: 1,
      created_at: knex.fn.now(6),
    })
  }

  async statusChange(payload: IPayloadStatusChange) {
    
    const response = await knex('carrier').where('cpf', payload.cpf)
    if (response.length === 0) {
      throw new CustomException('CPF not registered', 404)
    }
    
    await knex('carrier')
      .where('cpf', payload.cpf)
      .update('isActive', payload.action)
  }

  private async verifyCpfIsRegistred(cpf: string) {
    const response = await knex('carrier').where('cpf', cpf)
    if (response.length > 0) {
      throw new CustomException('CPF already registered', 404)
    }
  }

}

export { CarrierModel }
