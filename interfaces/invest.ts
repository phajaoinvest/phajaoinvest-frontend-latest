export interface IMyInvestmentResponse {
  id: string;
  amountInvested: string;
  investDate: string;
  duration: string;
  maturityDate: string;
  totalProfit: string;
  status: string;
  returnRate: string;
}

export interface InvestmentSummaryOverviewResponse {
  id: string;
  customer_id: string;
  service_id: string;
  total_investment_requests: number;
  approved_investments: number;
  active_investments: number;
  completed_investments: number;
  total_original_investment: string;
  total_current_balance: string;
  total_interest_earned: string;
  total_interest_paid: string;
  total_principal_returned: string;
  outstanding_interest: string;
  first_investment_date: string; // ISO datetime string
  last_investment_date: string; // ISO datetime string
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}
