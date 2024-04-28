export interface ICarrierData {
  cpf: string
  nome: string
}

export interface IStatusChange {
  cpf: string
  action: 'enable' | 'disable'
}

export interface IPayloadStatusChange {
  cpf: string
  action: 0 | 1
}
