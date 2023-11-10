export interface JajanItemTypes {
  categoryId: string
  createdAt: string
  deletedAt: string | null
  id: string
  imageUrl: string
  name: string
  originId: string
  price: number
  updatedAt: string
  vendorId: string
}

export interface TransactionItemTypes {
  createdAt: string
  deletedAt: string | null
  id: string
  jajanItem: JajanItemTypes
  jajanItemSnapshotId: string
  quantity: number
  transactionId: string
  updatedAt: string
}

export interface TransactionHistoryTypes {
  createdAt: string
  id: string
  lastLatitude: Float32Array | number | string
  lastLongitude: Float32Array | number | string
  paymentMethod: string
  transactionItems: TransactionItemTypes[]
  updatedAt: string
  userId: string
}
