import { afterAll, jest } from '@jest/globals';
import { AccountService } from '../../src/services/account';
import { accountModelMocked } from '../../mocks/dependencies';

describe('#Account Service', () => {

    let service = new AccountService(accountModelMocked);

    afterAll(() => {
        jest.clearAllMocks()
    })

    it('Create transaction success', () => {
        expect(
            () => service.create('98998379031')
        ).not.toThrow()
        expect(accountModelMocked.create).toHaveBeenCalled()
    })

    it('Consult balance account success', async () => {
        let result = await service.balance('06103581036')
        expect(result).toEqual({ 
            balance: 100, 
            number: 123, 
            agency: 456 
        })
        expect(accountModelMocked.consultBalance).toHaveBeenCalled()
    })

    it('Status change success', async () => {
        expect(
            () => service.statusChange({
                cpf: '06103581036',
                action: 'enable'
            })
        ).not.toThrow()
        expect(accountModelMocked.statusChange).toHaveBeenCalled()
    })

    it('Consult extract', () => {
        expect(
            () => service.extractAccountBetweenDate({
                cpf: '06103581036',
                startDate: '2024-07-01',
                endDate: '2024-07-05',
            })
        ).not.toThrow()
        expect(accountModelMocked.extractAccountBetweenDate).toHaveBeenCalled()
    })

})