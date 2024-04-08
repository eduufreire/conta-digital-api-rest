import { knex } from '../database'
import moment from 'moment-timezone'

class TransactionModel {
  async create(transaction) {
    await this.checkAccountExists(transaction.cpf)
    await this.checkAccountIsActive(transaction.cpf)
    if (transaction.type === 'withdraw') {
      await this.checkDiaryLimit(transaction)
      await this.checkBalanceAccount(transaction.cpf, transaction.amount)
    }

    await knex('transaction_account').insert({
      fkCpf: transaction.cpf,
      type: transaction.type,
      amount: transaction.amount,
      created_at: knex.fn.now(6),
    })

    await this.updateBalance(transaction)
  }

  private async updateBalance(transactionDTO) {
    const response = await knex('carrier_account')
      .where('fkCpf', transactionDTO.cpf)
      .select('balance')

    const totalBalance =
      transactionDTO.type === 'withdraw'
        ? transactionDTO.amount - parseFloat(response[0].balance)
        : transactionDTO.amount + parseFloat(response[0].balance)

    await knex('carrier_account')
      .where('fkCpf', transactionDTO.cpf)
      .update('balance', totalBalance)
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

  private async checkDiaryLimit(transaction) {
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
      throw new Error('Daily limit exceeded')
    }
  }

  private async checkBalanceAccount(cpf: string, amount: number) {
    const response = await knex('carrier_account')
      .where('fkCpf', cpf)
      .select('balance')

    if (response[0].balance < amount) {
      throw new Error('Insufficient funds')
    }
  }
}

export { TransactionModel }
