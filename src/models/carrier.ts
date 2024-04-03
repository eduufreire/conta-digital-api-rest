import { knex } from '../database'

class CarrierModel {
  async create(carrierDTO) {
    await this.verifyCpfIsRegistred(carrierDTO.cpf)
    await knex('carrier').insert({
      name: carrierDTO.nome,
      cpf: carrierDTO.cpf,
      created_at: knex.fn.now(6),
    })
  }

  private async verifyCpfIsRegistred(cpf: string) {
    const response = await knex('carrier').where('cpf', cpf)
    if (response.length > 0) {
      throw new Error('CPF already registered')
    }
  }
}

export { CarrierModel }
