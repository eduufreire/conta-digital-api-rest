import { IPayloadTransaction } from '../interfaces/transaction/ITransaction'
import { ITransactionRepository } from '../interfaces/transaction/ITransactioRepository'
import { cpfValidate } from '../utils/CpfValidate'

class TransactionService {
  
  constructor(
    private transactionRepository: ITransactionRepository
  ) { }

  async create(
    payload: IPayloadTransaction
  ): Promise<void> {

    payload.cpf = cpfValidate(payload.cpf)
    await this.transactionRepository.create(payload)
    
  }

}

export { TransactionService }
