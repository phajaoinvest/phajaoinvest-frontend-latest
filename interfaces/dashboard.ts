type ChartDataPoint = {
  month: string;
  value: number;
  profit: number;
  displayValue: string;
  displayProfit: string;
};

export interface IStockPerformanceResponse {
  currentValue: number;
  displayCurrentValue: string;
  ytdPercentChange: number;
  displayYtdPercent: string;
  chartData: ChartDataPoint[];
  description: string;
}

export interface IInvestmentPerformanceResponse {
  currentValue: number;
  displayCurrentValue: string;
  ytdPercentChange: number;
  displayYtdPercent: string;
  chartData: ChartDataPoint[];
  description: string;
}
