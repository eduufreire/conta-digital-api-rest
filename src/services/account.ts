import { IExtractAccount, IPayloadAccount, IPayloadAccountBalance, ICheckExtractAccount, IResponseExtractAccount } from '../interfaces/account/IAccount'
import { IAccountRepository } from '../interfaces/account/iAccountRepository'
import { IPayloadStatusChange, IStatusChange } from '../interfaces/carrier/ICarrier'
import { cpfValidate } from '../utils/CpfValidate'

class AccountService {

  _accountRepository: IAccountRepository

  constructor(accountRepository: IAccountRepository){
    this._accountRepository = accountRepository
  }

  async create(cpf: string): Promise<void> {

    const accountData: IPayloadAccount = {
      fkCpf: cpf,
      number: cpf.substring(0, 3),
      agency: '1001',
      balance: 0.0,
      created_at: '',
      isActive: 1,
    }

    await this._accountRepository.create(accountData)
  }


  async balance(cpf: string): Promise<IPayloadAccountBalance> {
    const cpfFormated: string = cpfValidate(cpf)

    let result: IPayloadAccountBalance = await this._accountRepository.consultBalance(cpfFormated)
    return result
  }

  async statusChange(payload: IStatusChange) {

    let cpfValid = cpfValidate(payload.cpf)
    let action: 0 | 1 = payload.action === 'enable' ? 1 : 0

    let payloadValidate: IPayloadStatusChange = {
      cpf: cpfValid,
      action: action
    }

    await this._accountRepository.statusChange(payloadValidate)
  }

  async extractAccountBetweenDate(payloadExtract: ICheckExtractAccount) {
    payloadExtract.cpf = cpfValidate(payloadExtract.cpf)

    let listTransactionAccount: Array<IExtractAccount> = await accountModel.extractAccountBetweenDate(payloadExtract)

    let response: IResponseExtractAccount = {
      status: 0,
      data: []
    }

    if(listTransactionAccount.length > 0){
      response.status = 200
      response.data = listTransactionAccount
    } else {
      response.status = 204
    }

    return response
  }

}

export { AccountService }

