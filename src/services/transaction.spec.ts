import { IPayloadTransaction } from "../interfaces/transaction/ITransaction"
import { TransactionInMemory } from "../models/in-memory/transactionInMemory"
import { TransactionService } from "./transacoes"

describe("Transaction service", () => {

    let repo;
    let service;

    beforeAll(() => {
         repo = new TransactionInMemory()
         service = new TransactionService(repo)
    })

    it("criacao de uma transacao", async () => {

        const payload: IPayloadTransaction = {
            cpf: '42749702054',
            amount: 190.00,
            type: 'deposit'
        }

        await service.create(payload)

        const teste = repo.getTransactions('42749702054')

        expect(teste).toHaveProperty('id')
        expect(teste?.amount).toEqual(payload.amount)

    })

    it("ja existe", async () => {

        const payload: IPayloadTransaction = {
            cpf: '46821138010',
            amount: 190.00,
            type: 'deposit'
        }

        await service.create(payload)

        await expect(service.create(payload))
                            .rejects
                            .toEqual(new Error("Duplicidade"))

    })

    it("cpf invalido", async () => {

        const payload: IPayloadTransaction = {
            cpf: '4682113',
            amount: 190.00,
            type: 'deposit'
        }

        await expect( service.create(payload))
        .rejects
        .toEqual(new Error('CPF is not valid'))

    })


})