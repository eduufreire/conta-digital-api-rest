import { IPayloadStatusChange } from "../carrier/ICarrier"
import { IExtractAccount, IPayloadAccount, IPayloadAccountBalance, ICheckExtractAccount } from "./IAccount"

export interface IAccountRepository {
    create(payload: IPayloadAccount): Promise<void>
    
    consultBalance(cpf: string): Promise<IPayloadAccountBalance>

    statusChange(payload: IPayloadStatusChange): Promise<void>

    extractAccountBetweenDate(payloadExtract: ICheckExtractAccount): Promise<Array<IExtractAccount>>
}