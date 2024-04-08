import { knex } from '../database'

class AccountModel {
  async create(data) {
    data.created_at = knex.fn.now(6)
    await knex('carrier_account').insert(data)
  }

  async consultBalance(cpf: string) {
    await this.checkAccountExists(cpf)
    await this.check(cpf)
    return await knex('carrier_account')
      .where('fkCpf', cpf)
      .select('balance', 'number', 'agency')
  }

  async statusChange(dataUpdate) {
    await this.checkAccountExists(dataUpdate.cpf)
    await knex('carrier_account')
      .where('fkCpf', dataUpdate.cpf)
      .update('isActive', dataUpdate.action)
  }

  private async checkAccountExists(cpf: string) {
    const response = await knex('carrier_account').where('fkCpf', cpf)
    if (response.length === 0) {
      throw new Error('Account not registered')
    }
  }

  private async checkAccountIsActive(cpf: string) {
    const response = await knex('carrier_account').where('fkCpf', cpf)
    if (response[0].isActive === 0) {
      throw new Error('Account is not active')
    }
  }
}

export { AccountModel }
