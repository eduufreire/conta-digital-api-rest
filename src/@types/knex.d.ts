import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    carrier: {
      cpf: string
      name: string
      created_at: string
      isActive: number
    }
    carrier_account: {
      fkCpf: string
      number: string
      agency: string
      balance: number
      isActive: number
      created_at: string
    }
    transaction_account: {
      id: number
      type: string
      amount: number
      created_at: string
      fkCpf: string
    }
  }
}
