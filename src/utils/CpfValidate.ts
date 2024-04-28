import { CPF } from '@julioakira/cpf-cnpj-utils'

export function cpfValidate(cpf: string): string {
    const cpfFormated = CPF.Strip(cpf)
    const cpfValid = CPF.Validate(cpfFormated)
    if (!cpfValid) {
      throw new Error('CPF is not valid')
    }
    return cpfFormated
}