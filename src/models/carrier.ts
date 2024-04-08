import { knex } from '../database'

class CarrierModel {
  async create(carrierDTO) {
    await this.verifyCpfIsRegistred(carrierDTO.cpf)
    await knex('carrier').insert({
      name: carrierDTO.nome,
      cpf: carrierDTO.cpf,
      isActive: 1,
      created_at: knex.fn.now(6),
    })
  }

  async statusChange(carrierDTO) {
    await this.checkCpfExists(carrierDTO.cpf)
    await knex('carrier')
      .where('cpf', carrierDTO.cpf)
      .update('isActive', carrierDTO.action)
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
