export default interface AdminTypes {
  id: string;
  fullname: string;
  gender: string;
  email: string;
  updatedAt: string;
  createdAt: string;
  deletedAt: string;
}

export default interface VendorTypes {
  id: string;
  fullname: string;
  gender: string;
  address: string;
  username: string;
  email: string;
  balance: number;
  experience: number;
  jajan_image_url: string;
  jajan_name: string;
  jajan_description: string;
  last_latitude: Float32Array | number | string;
  last_longitude: Float32Array | number | string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export default interface CustomerTypes {
  id: string;
  fullname: string;
  gender: string;
  address: string;
  username: string;
  email: string;
  balance: number;
  experience: number;
  last_latitude: Float32Array | number | string;
  last_longitude: Float32Array | number | string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}