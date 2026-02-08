import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CustomerData } from "../../interfaces/profile";

interface CustomerState {
  customer: CustomerData | null;
  setCustomer: (data: CustomerData) => void;
  clearCustomer: () => void;
}

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      customer: null,
      setCustomer: (data) => set({ customer: data }),
      clearCustomer: () => set({ customer: null }),
    }),
    {
      name: "customer", // key in localStorage
      partialize: (state) => ({
        // ⚠️ Do not persist password
        customer: state.customer
          ? { ...state.customer, password: undefined as any }
          : null,
      }),
    }
  )
);
