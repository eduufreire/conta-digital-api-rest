import { knex } from '../database'

class PortadorModel {
  async create(portadorDTO) {
    await this.verifyCpfIsRegistred(portadorDTO.cpf)
    await knex('usuarios').insert({
      nome: portadorDTO.nome,
      cpf: portadorDTO.cpf,
    })
  }

  async verifyCpfIsRegistred(cpf: string) {
    const response = await knex('usuarios').where('cpf', cpf)
    if (response.length > 0) {
      throw new Error('CPF está registrado')
    }
  }
}

export { PortadorModel }
