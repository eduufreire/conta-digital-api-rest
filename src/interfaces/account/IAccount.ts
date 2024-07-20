export interface IPayloadAccount {
    fkCpf: string
    number: string
    agency: string
    balance: number,
    created_at: any
    isActive: 0 | 1,
}

export interface IPayloadAccountBalance {
    balance: number
    number: number
    agency: number
}

export interface ICheckExtractAccount {
    cpf: string
    startDate: string,
    endDate: string,
}
export interface IExtractAccount {
    type: 'withdraw' | 'deposit'
    amount: number
    created_at: string
}
