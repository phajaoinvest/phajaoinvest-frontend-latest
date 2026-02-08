export interface IPackagesResponse {
  id: string;
  price: number;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  currency: string;
  description: string;
  service_type: string;
  duration_months: number;
  is_current: boolean;
  features: string[];
  days_left: number;
  expiredDate?: Date;
}
