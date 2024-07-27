import {jest} from '@jest/globals';
import { TransactionService } from "../../src/services/transaction"
import { transactionModelMocked } from '../../mocks/dependencies';

describe('#Transaction Service', () => {

    afterAll(() => {
        jest.clearAllMocks()
    })

    it('create method', () => {
        const test = new TransactionService(transactionModelMocked)
        test.create({
            cpf: '98998379031',
            type: 'deposit',
            amount: 100,
        })
        expect(transactionModelMocked.create).toHaveBeenCalled()
    })

})