import { knex } from '../database'
import { CustomException } from '../helpers/customException'
import { IExtractAccount, IPayloadAccount, IPayloadAccountBalance, ICheckExtractAccount } from '../interfaces/account/IAccount'
import { IAccountRepository } from '../interfaces/account/IAccountRepository'
import { IPayloadStatusChange } from '../interfaces/carrier/ICarrier'

class AccountModel implements IAccountRepository {

  async create(
    payload: IPayloadAccount
  ): Promise<void> {

    payload.created_at = knex.fn.now(6)
    await knex('carrier_account').insert(payload)

  }

  async consultBalance(
    cpf: string
  ): Promise<IPayloadAccountBalance> {

    await this.checkAccountExists(cpf)
    await this.checkAccountIsActive(cpf)
    return await knex('carrier_account')
      .where('fkCpf', cpf)
      .select('balance', 'number', 'agency')

  }

  async statusChange(
    payload: IPayloadStatusChange
  ): Promise<void> {

    await this.checkAccountExists(payload.cpf)
    await knex('carrier_account')
      .where('fkCpf', payload.cpf)
      .update('isActive', payload.action)

  }

  async extractAccountBetweenDate(
    payloadExtract: ICheckExtractAccount
  ): Promise<Array<IExtractAccount>> {

    await this.checkAccountExists(payloadExtract.cpf)
    return await knex('transaction_account')
      .where('fkCpf', payloadExtract.cpf)
      .whereRaw('CAST(created_at as DATE) between ? and ?', [
        payloadExtract.startDate,
        payloadExtract.endDate,
      ])
      .select('type', 'amount', 'created_at')

  }

  private async checkAccountExists(
    cpf: string
  ): Promise<void> {

    const response = await knex('carrier_account').where('fkCpf', cpf)
    if (response.length === 0) {
      throw new CustomException('Account not registered', 404)
    }

  }

  private async checkAccountIsActive(
    cpf: string
  ): Promise<void> {

    const response = await knex('carrier_account').where('fkCpf', cpf)
    if (response[0].isActive === 0) {
      throw new CustomException('Account is not active', 400)
    }

  }
}

export { AccountModel }
