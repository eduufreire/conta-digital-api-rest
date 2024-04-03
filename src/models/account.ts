import { knex } from '../database'

class AccountModel {
  async create(data) {
    data.created_at = knex.fn.now(6)
    await knex('carrier_account').insert(data)
  }

  async consultBalance(cpf: string) {
    return await knex('carrier_account')
      .where('fkCpf', cpf)
      .select('balance', 'number', 'agency')
  }
}

export { AccountModel }
