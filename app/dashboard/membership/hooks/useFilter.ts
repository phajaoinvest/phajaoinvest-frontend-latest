import React from "react";
import { FilterState } from "@/interfaces/filter";

// --- ACTION TYPES ---
const ACTION_TYPE = {
  PAGE: "page",
  LIMIT: "limit",
  START_DATE: "start_date",
  END_DATE: "end_date",
} as const;

// --- ACTION TYPE DEFINITION ---
type Action =
  | { type: typeof ACTION_TYPE.PAGE; payload: number }
  | { type: typeof ACTION_TYPE.LIMIT; payload: number }
  | { type: typeof ACTION_TYPE.START_DATE; payload: string | null }
  | { type: typeof ACTION_TYPE.END_DATE; payload: string | null };

// --- INITIAL STATE ---
const initialState: FilterState = {
  page: 1,
  limit: 20,
  start_date: "",
  end_date: "",
};

// --- REDUCER ---
const reducer = (state: FilterState, action: Action): FilterState => {
  switch (action.type) {
    case ACTION_TYPE.PAGE:
      return { ...state, page: action.payload };

    case ACTION_TYPE.LIMIT:
      return { ...state, limit: action.payload, page: 1 };

    case ACTION_TYPE.START_DATE:
      return { ...state, start_date: action.payload || "", page: 1 };

    case ACTION_TYPE.END_DATE:
      return { ...state, end_date: action.payload || "", page: 1 };

    default:
      return state;
  }
};

// --- HOOK ---
const MemberShipPaymentHistory = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // Memoized data for API or query usage
  const data = React.useMemo(() => ({ ...state }), [state]);

  return {
    state,
    data,
    dispatch,
    ACTION_TYPE,
  };
};

export default MemberShipPaymentHistory;
