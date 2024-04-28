import { knex } from '../database'
import { IExtractAccount, IPayloadAccount, IPayloadAccountBalance, IPayloadExtractAccount, IResponseExtractAccount } from '../interfaces/account/IAccount'
import { IAccountRepository } from '../interfaces/account/iAccountRepository'
import { IPayloadStatusChange } from '../interfaces/carrier/ICarrier'

class AccountModel implements IAccountRepository{

  async create(payload: IPayloadAccount): Promise<void> {
    payload.created_at = knex.fn.now(6).toString()
    await knex('carrier_account').insert(payload)
  }

  async consultBalance( cpf: string ): Promise<IPayloadAccountBalance> {
    await this.checkAccountExists(cpf)
    await this.checkAccountIsActive(cpf)
    return await knex('carrier_account')
      .where('fkCpf', cpf)
      .select('balance', 'number', 'agency')
  }

  async statusChange(payload: IPayloadStatusChange): Promise<void> {
    await this.checkAccountExists(payload.cpf)
    await knex('carrier_account')
      .where('fkCpf', payload.cpf)
      .update('isActive', payload.action)
  }

  async extractAccountBetweenDate( payloadExtract: IPayloadExtractAccount ): Promise<Array<IExtractAccount>> {
    
    await this.checkAccountExists(payloadExtract.cpf)

    return await knex('transaction_account')
      .where('fkCpf', payloadExtract.cpf)
      .whereRaw('CAST(created_at as DATE) between ? and ?', [
        payloadExtract.startDate,
        payloadExtract.endDate,
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
