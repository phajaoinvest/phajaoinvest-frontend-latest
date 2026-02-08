export interface FilterState {
  page: number;
  limit: number;
  lang?: string;
  search?: string;
  sector?: string;
  risk_level?: string;
  start_date?: string;
  end_date?: string;
}
