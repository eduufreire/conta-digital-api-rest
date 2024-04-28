import { IPayloadTransaction } from "./ITransaction";

export interface ITransactionRepository {
    create(payload: IPayloadTransaction): Promise<void>
}