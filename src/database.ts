import { knex as setupConfig, Knex } from 'knex'

export const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: 'connect-db',
    user: 'root',
    password: 'root',
    database: 'digital_account',
  },
}

export const knex = setupConfig(config)
