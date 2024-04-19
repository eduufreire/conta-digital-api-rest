import { CarrierData, CarrierStatusChange } from './Carrier'

export interface CarrierRepository {
  create(carrierData: CarrierData): void
  statusChange(carrierStatusChange: CarrierStatusChange): void
}
