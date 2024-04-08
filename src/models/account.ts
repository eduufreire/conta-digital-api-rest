import { knex } from '../database'

class AccountModel {
  async create(data) {
    data.created_at = knex.fn.now(6)
    await knex('carrier_account').insert(data)
  }

  async consultBalance(cpf: string) {
    await this.checkAccountExists(cpf)
    await this.checkAccountIsActive(cpf)
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

  async extractAccountBetweenDate(extract) {
    await this.checkAccountExists(extract.cpf)
    return await knex('transaction_account')
      .where('fkCpf', extract.cpf)
      .whereRaw('CAST(created_at as DATE) between ? and ?', [
        extract.inicio,
        extract.fim,
      ])
      .select('type', 'amount', 'created_at')
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
