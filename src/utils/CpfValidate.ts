import { CPF } from '@julioakira/cpf-cnpj-utils'
import { CustomException } from '../errorHandler'

export function cpfValidate(cpf: string): string {
    const cpfFormated = CPF.Strip(cpf)
    const cpfValid = CPF.Validate(cpfFormated)
    if (!cpfValid) {
      throw new CustomException('CPF is not valid', 400)
    }
    return cpfFormated
}