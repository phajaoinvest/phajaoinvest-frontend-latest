import React from "react";

// APIs and Interface:
import { queryData } from "@/app/api/api";
import { FilterState } from "@/interfaces/filter";
import { IMyStockResponse } from "@/interfaces/stock";

const useFetchMyStockById = ({ filter }: { filter: FilterState }) => {
   const { page, limit, start_date, end_date } = filter;

   const [total, setTotal] = React.useState(0);
   const [loading, setLoading] = React.useState(false);
   const [data, setData] = React.useState<IMyStockResponse[]>([]);
   const [error, setError] = React.useState<Error | null>(null);

   const fetchStocks = async () => {
      setLoading(true);
      setError(null);

      try {
         const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
         });

         if (start_date) params.append("start_date", start_date);
         if (end_date && end_date !== "all") params.append("end_date", end_date);

         const response = await queryData({
            url: `/customer-stocks?${params.toString()}`,
         });

         if (response.status_code === 200 && response.is_error === false) {
            const data = response.data as IMyStockResponse[];
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
      fetchStocks();
   }, [filter]);

   return { data, total, loading, error };
};

export { useFetchMyStockById };
