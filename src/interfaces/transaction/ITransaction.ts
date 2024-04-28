export interface IPayloadTransaction {
    cpf: string
    type: 'withdraw' | 'deposit'
    amount: number,
}