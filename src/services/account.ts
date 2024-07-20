import { IExtractAccount, IPayloadAccount, IPayloadAccountBalance, ICheckExtractAccount } from '../interfaces/account/IAccount'
import { IAccountRepository } from '../interfaces/account/iAccountRepository'
import { IPayloadStatusChange, IStatusChange } from '../interfaces/carrier/ICarrier'
import { cpfValidate } from '../utils/CpfValidate'

class AccountService {

  constructor(
    private accountRepository: IAccountRepository
  ) { }

  async create(
    cpf: string
  ): Promise<void> {

    const accountData: IPayloadAccount = {
      fkCpf: cpf,
      number: cpf.substring(0, 3),
      agency: '1001',
      balance: 0.0,
      created_at: '',
      isActive: 1,
    }
    await this.accountRepository.create(accountData)

  }

  async balance(
    cpf: string
  ): Promise<IPayloadAccountBalance> {

    const cpfFormated: string = cpfValidate(cpf)
    return await this.accountRepository.consultBalance(cpfFormated)

  }

  async statusChange(
    payload: IStatusChange
  ): Promise<void> {

    let cpfValid = cpfValidate(payload.cpf)
    let action: 0 | 1 = payload.action === 'enable' ? 1 : 0

    let payloadValidate: IPayloadStatusChange = {
      cpf: cpfValid,
      action: action
    }

    await this.accountRepository.statusChange(payloadValidate)

  }

  async extractAccountBetweenDate(
    payloadExtract: ICheckExtractAccount
  ): Promise<Array<IExtractAccount>> {

    payloadExtract.cpf = cpfValidate(payloadExtract.cpf)
    return await this.accountRepository.extractAccountBetweenDate(payloadExtract)

  }
}

export { AccountService }

