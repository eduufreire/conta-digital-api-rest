import { IPayloadTransaction } from '../interfaces/transaction/ITransaction'
import { ITransactionRepository } from '../interfaces/transaction/ITransactioRepository'
import { cpfValidate } from '../utils/CpfValidate'

class TransactionService {

  _transactionRepository: ITransactionRepository

  constructor(transactionRepository: ITransactionRepository){
    this._transactionRepository = transactionRepository
  }

  async create(payload: IPayloadTransaction): Promise<void> {
    payload.cpf = cpfValidate(payload.cpf)
    await this._transactionRepository.create(payload)
  }

  
}

export { TransactionService }
