import { type VendorTypes, type CustomerTypes } from './UserTypes'

export interface TopUpHistory {
  id: string
  userId: string
  xenditInvoiceId: string
  amount: number
  media: string
  updatedAt: string
  createdAt: string
  user?: CustomerTypes
}

export interface PayoutHistory {
  id: string
  vendorId: string
  xenditPayoutId: string
  amount: number
  media: string
  updatedAt: string
  createdAt: string
  vendor?: VendorTypes
}
