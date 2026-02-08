export interface ICountriesResponse {
  id: string;
  name: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface IProvincesResponse {
  id: string;
  name: string;
  country_id: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface IDistrictsResponse {
  id: string;
  name: string;
  postcode: string;
  province_id: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}
