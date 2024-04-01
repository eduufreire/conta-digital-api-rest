import { CPF } from '@julioakira/cpf-cnpj-utils'
import { PortadorModel } from '../models/portador'

class PortadorService {
  _model: PortadorModel

  constructor(portadorModel: PortadorModel) {
    this._model = portadorModel
  }

  async create(portadorDTO) {
    const cpfFormated = CPF.Strip(portadorDTO.cpf)
    const cpfValid = CPF.Validate(cpfFormated)

    portadorDTO.cpf = cpfFormated

    if (!cpfValid) {
      throw new Error('CPF não válido')
    }

    await this._model.create(portadorDTO)
  }
}

export { PortadorService }
