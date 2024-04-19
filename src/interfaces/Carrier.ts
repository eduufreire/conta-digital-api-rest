export interface CarrierData {
  cpf: string
  nome: string
}

export interface CarrierStatusChange {
  cpf: string
  action: 'enable' | 'disable'
}
