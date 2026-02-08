export interface CustomerProfileResponse {
  is_error: boolean;
  code: string;
  message: string;
  data: CustomerData;
  error: string | null;
  status_code: number;
}

export interface CustomerData {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
  phone_number: string | null;
  status: "active" | "inactive" | string;
  isVerify: boolean;
  profile: string | null;
  deleted_by: string | null;
  created_at: Date;
  updated_at: Date;
  services: IServiceType[];
}

export interface IServiceType {
  service_type: string;
  status: string;
}
