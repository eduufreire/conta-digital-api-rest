import { object } from "zod";
import { ITransactionRepository } from "../../interfaces/transaction/ITransactioRepository";
import { IPayloadTransaction } from "../../interfaces/transaction/ITransaction";
import {v4 as uuid } from 'uuid'

class Transaction{

    constructor(public id: string, public cpf: string, public type: string,  public amount: number){}

}


export class TransactionInMemory implements ITransactionRepository{

    private transations: Transaction[] = []

    async create(payload: IPayloadTransaction): Promise<void> {
       
        const teste = {
            id: uuid(),
            cpf: payload.cpf,
            amount: payload.amount,
            type: payload.type
        }

        const jaExiste = this.getTransactions(teste.cpf)

        if(jaExiste?.cpf === teste.cpf){
            throw new Error("Duplicidade")
        }

        this.transations.push(teste)

    }

    getTransactions(cpf: string): Transaction | undefined {
        return this.transations.find( (e) => e.cpf === cpf )
    }



}