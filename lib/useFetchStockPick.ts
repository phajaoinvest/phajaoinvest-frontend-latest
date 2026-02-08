import React from "react";

// APIs and Interface:
import { queryData } from "@/app/api/api";
import { IStockPick } from "@/interfaces/stock";
import { FilterState } from "@/interfaces/filter";

const useFetchStockPicks = ({ filter }: { filter: FilterState }) => {
  const { page, limit, sector, risk_level } = filter;

  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [data, setData] = React.useState<IStockPick[]>([]);

  const fetchStockPicks = async () => {
    setLoading(true);
    setError(null);

    try {
      // Build query params dynamically
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      if (sector) params.append("sector", sector);
      if (risk_level && risk_level !== "all")
        params.append("risk_level", risk_level);

      const response = await queryData({
        url: `/stock-picks?${params.toString()}`,
      });

      if (response.status_code === 200 && response.is_error === false) {
        const data = response.data as IStockPick[];
        setData(data);
        setTotal(response.total);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchStockPicks();
  }, [filter]);

  return { data, total, loading, error };
};

export { useFetchStockPicks };
