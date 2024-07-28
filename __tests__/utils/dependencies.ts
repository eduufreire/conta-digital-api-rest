import { jest } from "@jest/globals";
import { ICarrierRepository } from "../../src/interfaces/carrier/ICarrierRepository";
import { ITransactionRepository } from "../../src/interfaces/transaction/ITransactioRepository";
import { IAccountRepository } from "../../src/interfaces/account/IAccountRepository";
import { IExtractAccount, IPayloadAccountBalance } from "../../src/interfaces/account/IAccount";

export const accountModelMocked: jest.Mocked<IAccountRepository> = {
    create: jest
        .fn<() => Promise<void>>()
        .mockResolvedValue(),
    consultBalance: jest
        .fn<() => Promise<IPayloadAccountBalance>>()
        .mockResolvedValue({ balance: 100, number: 123, agency: 456 }),
    extractAccountBetweenDate: jest
        .fn<() => Promise<Array<IExtractAccount>>>()
        .mockResolvedValue([{ type: 'deposit', amount: 100, created_at: '2024-07-01' }]),
    statusChange: jest
        .fn<() => Promise<void>>()
        .mockResolvedValue()
}

export const carrierModelMocked: jest.Mocked<ICarrierRepository> =  {
    create: jest
        .fn<() => void>()
        .mockReturnValue(),
    statusChange: jest
        .fn<() => void>()
        .mockReturnValue()
}

export const transactionModelMocked: jest.Mocked<ITransactionRepository> = {
    create: jest
        .fn<() => Promise<void>>()
        .mockImplementation(() => Promise.resolve()),
}