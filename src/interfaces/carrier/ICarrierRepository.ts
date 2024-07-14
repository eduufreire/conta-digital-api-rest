import { ICarrierData, IPayloadStatusChange } from './ICarrier'

export interface ICarrierRepository {
  create(carrierData: ICarrierData): void
  statusChange(carrierStatusChange: IPayloadStatusChange): void
}
