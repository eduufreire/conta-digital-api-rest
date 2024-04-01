import { knex as setupConfig, Knex } from 'knex'

export const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3333,
    user: 'root',
    password: 'root',
    database: 'teste',
  },
}

export const knex = setupConfig(config)
