import React from "react";

// APIs and Interface:
import { queryData } from "@/app/api/api";
import { FilterState } from "@/interfaces/filter";
import { IMemberShipTransactionHistories } from "@/interfaces/transaction";

const useFetchMemberShipPaymentHistory = ({
  filter,
}: {
  filter: FilterState;
}) => {
  const { page, limit, start_date, end_date } = filter;

  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<IMemberShipTransactionHistories[]>([]);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchMemberShipTransactionHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      // ✅ Only append dates if both are provided
      if (start_date && end_date) {
        params.append("start_date", start_date);
        params.append("end_date", end_date);
      }

      const response = await queryData({
        url: `/customers/services/payments/history?${params.toString()}`,
      });

      if (response.status_code === 200 && response.is_error === false) {
        const data = response.data as IMemberShipTransactionHistories[];
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
    fetchMemberShipTransactionHistory();
  }, [filter]);

  return { data, total, loading, error };
};

export { useFetchMemberShipPaymentHistory };
