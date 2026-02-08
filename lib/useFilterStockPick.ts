import { FilterState } from "@/interfaces/filter";
import React from "react";

// --- ACTION TYPES ---
const ACTION_TYPE = {
  PAGE: "page",
  LIMIT: "limit",
  SECTOR: "sector",
  RISK_LEVEL: "risk_level",
} as const;

// --- ACTION TYPE DEFINITION ---
type Action =
  | { type: typeof ACTION_TYPE.PAGE; payload: number }
  | { type: typeof ACTION_TYPE.LIMIT; payload: number }
  | { type: typeof ACTION_TYPE.SECTOR; payload: string | null }
  | { type: typeof ACTION_TYPE.RISK_LEVEL; payload: string | null };

// --- INITIAL STATE ---
const initialState: FilterState = {
  page: 1,
  limit: 20,
  sector: "",
  risk_level: "",
};

// --- REDUCER ---
const reducer = (state: FilterState, action: Action): FilterState => {
  switch (action.type) {
    case ACTION_TYPE.PAGE:
      return { ...state, page: action.payload };

    case ACTION_TYPE.LIMIT:
      return { ...state, limit: action.payload, page: 1 };

    case ACTION_TYPE.SECTOR:
      return { ...state, sector: action.payload || "", page: 1 };

    case ACTION_TYPE.RISK_LEVEL:
      return { ...state, risk_level: action.payload || "", page: 1 };

    default:
      return state;
  }
};

// --- HOOK ---
const useFilterStockPicks = () => {
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

export default useFilterStockPicks;
