import { jest } from "@jest/globals";
import { CarrierService } from "../../src/services/carrier";
import { AccountService } from "../../src/services/account";
import { accountModelMocked, carrierModelMocked } from "../utils/dependencies";

jest.mock('../../src/services/account.ts')

describe('#Carrier Service', () => {

    let service = new CarrierService(
        carrierModelMocked, 
        new AccountService(accountModelMocked)
    )

    it('Create carrier and account', () => {
        expect(
            async () => await service.create({
                cpf: '63948252041',
                nome: 'Edu'
            })
        ).not.toThrow()
        expect(carrierModelMocked.create).toHaveBeenCalled()
    })

    it('Change status carrier and account', () => {
        expect(
            async () => await service.statusChange({
                cpf: '63948252041',
                action: 'enable'
            })
        ).not.toThrow()
        expect(carrierModelMocked.statusChange).toHaveBeenCalled()
    })

})