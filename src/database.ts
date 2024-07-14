import { knex as setupConfig, Knex } from 'knex'

export const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'urubu100',
    database: 'digital_account',
  },
}

export const knex = setupConfig(config)
