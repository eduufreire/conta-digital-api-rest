import { IPayloadStatusChange } from "../carrier/ICarrier"
import { IExtractAccount, IPayloadAccount, IPayloadAccountBalance, IPayloadExtractAccount } from "./IAccount"

export interface IAccountRepository {
    create(cpf: IPayloadAccount): Promise<void>
    
    consultBalance(cpf: string): Promise<IPayloadAccountBalance>

    statusChange(payload: IPayloadStatusChange): Promise<void>

    extractAccountBetweenDate(payloadExtract: IPayloadExtractAccount): Promise<Array<IExtractAccount>>
}