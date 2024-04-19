import { knex } from '../database'
import { CarrierData, CarrierStatusChange } from '../interfaces/Carrier'
import { CarrierRepository } from '../interfaces/CarrierRepository'

class CarrierModel implements CarrierRepository {
  async create(carrierData: CarrierData) {
    await this.verifyCpfIsRegistred(carrierData.cpf)
    await knex('carrier').insert({
      name: carrierData.nome,
      cpf: carrierData.cpf,
      isActive: 1,
      created_at: knex.fn.now(6),
    })
  }

  async statusChange(carrierStatusChange: CarrierStatusChange) {
    await this.checkCpfExists(carrierStatusChange.cpf)
    await knex('carrier')
      .where('cpf', carrierStatusChange.cpf)
      .update('isActive', carrierStatusChange.action)
  }

  private async verifyCpfIsRegistred(cpf: string) {
    const response = await knex('carrier').where('cpf', cpf)
    if (response.length > 0) {
      throw new Error('CPF already registered')
    }
  }

  private async checkCpfExists(cpf: string) {
    const response = await knex('carrier').where('cpf', cpf)
    if (response.length === 0) {
      console.log('response', response)
      throw new Error('CPF not registered')
    }
  }
}

export { CarrierModel }
