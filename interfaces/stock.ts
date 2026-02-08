export interface IStockPick {
  id: string;
  sector: string;
  status: string;
  expires_at: Date;
  created_at: Date;
  risk_level: string;
  sale_price: number;
  tier_label: string;
  description: string;
  key_points: [string];
  analyst_name: string;
  service_type: string;
  is_selected: boolean;
  target_price: string;
  current_price: string;
  email_delivery: boolean;
  time_horizon_min_months: number;
  time_horizon_max_months: number;
  expected_return_min_percent: number;
  expected_return_max_percent: number;
}

export interface IMyStockPickResponse {
  id: string;
  date: string;
  status: string;
  stock: string;
  change: string;
  company: string;
  buyPrice: string;
  risk_level: string;
  isPositive: boolean;
  currentPrice: string;
  recommendation: string;
}

export interface IMyStockResponse {
  id: string;
  name: string;
  market: string;
  shares: number;
  currentPrice: string;
  totalValue: string;
  invested: string;
  profit: string;
  change: string;
  isPositive: boolean;
}

export interface IAddfundTransaction {
  id: string;
  identify: string;
  amount: number;
  payment_slip: string;
  status: string;
  service_id: string | null;
  customer_id: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  created_by: string | null;
  updated_by: string | null;
  approved_by: string | null;
  rejected_by: string | null;
}

export interface IStockReponse {
  id: string;
  name: string;
  company: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  market: string;
  marketCap: string;
  pe: string;
  country: string;
  volume: string;
}

// internation stock pick performance
export interface IStockPickResponse {
  total_picks: string;
  this_month_new: string;
  winning_rate_percent: string;
  winning_fraction: string;
  total_return: string;
  overall_return_percent: string;
  avg_return_percent_per_pick: string;
}

// internation performance
export interface IInternationStockResponse {
  totalValue: string;
  totalInvested: string;
  totalProfit: string;
  profitPercent: string;
}
