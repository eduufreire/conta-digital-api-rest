import { knex } from '../database'
import moment from 'moment-timezone'
import { ITransactionRepository } from '../interfaces/transaction/ITransactioRepository'
import { IPayloadTransaction } from '../interfaces/transaction/ITransaction'
import { CustomException } from '../errorHandler'

class TransactionModel implements ITransactionRepository{

  async create(
    payload: IPayloadTransaction
  ): Promise<void> {

    await this.checkAccountExists(payload.cpf)
    await this.checkAccountIsActive(payload.cpf)

    if (payload.type === 'withdraw') {
      await this.checkDiaryLimit(payload)
      await this.checkBalanceAccount(payload.cpf, payload.amount)
    }

    await knex('transaction_account').insert({
      fkCpf: payload.cpf,
      type: payload.type,
      amount: payload.amount,
      created_at: knex.fn.now(6),
    })

    await this.updateBalance(payload)
  }

  private async updateBalance(
    payload: IPayloadTransaction
  ): Promise<void> {

    const currentBalance: number = await this.getCurrentBalance(payload.cpf)

    const totalBalance =
      payload.type === 'withdraw'
        ? payload.amount - currentBalance
        : payload.amount + currentBalance

    await knex('carrier_account')
      .where('fkCpf', payload.cpf)
      .update('balance', totalBalance)

  }

  private async getCurrentBalance(
    cpf: string
  ): Promise<number> {

    const response: number = await knex('carrier_account')
      .where('fkCpf', cpf)
      .select('balance')
    return parseFloat(response[0].balance)

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

  private async checkDiaryLimit(
    transaction: IPayloadTransaction
  ): Promise<void> {

    const response = await knex('transaction_account')
      .where({
        fkCpf: transaction.cpf,
        type: 'withdraw',
      })
      .whereRaw(
        'CAST(created_at as DATE) = ?',
        moment.tz('America/Sao_Paulo').format('YYYY-MM-DD'),
      )
      .sum('amount as transaction_diary')

    const sumAmountWithLimit =
      transaction.amount + response[0].transaction_diary

    if (sumAmountWithLimit >= 2000) {
      throw new CustomException('Daily limit exceeded', 400)
    }

  }

  private async checkBalanceAccount(
    cpf: string, amount: number
  ): Promise<void> {

    const response = await knex('carrier_account')
      .where('fkCpf', cpf)
      .select('balance')

    if (response[0].balance < amount) {
      throw new CustomException('Insufficient funds', 400)
    }

  }

}

export { TransactionModel }
