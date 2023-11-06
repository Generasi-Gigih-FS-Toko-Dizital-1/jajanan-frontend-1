export interface AdminTypes {
  id: string
  fullName: string
  gender: string
  email: string
  updatedAt: string
  createdAt: string
  deletedAt: string
}

export interface VendorTypes {
  id: string
  fullName: string
  gender: string
  address: string
  username: string
  email: string
  balance: number
  experience: number
  jajanImageUrl: string
  jajanName: string
  jajanDescription: string
  lastLatitude: Float32Array | number | string
  lastLongitude: Float32Array | number | string
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface CustomerTypes {
  id: string
  fullName: string
  gender: string
  address: string
  username: string
  email: string
  balance: number
  experience: number
  lastLatitude: Float32Array | number | string
  lastLongitude: Float32Array | number | string
  createdAt: string
  updatedAt: string
  deletedAt: string
}
