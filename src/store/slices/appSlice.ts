import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { STORAGE_KEYS } from "../../constants";

/**
 * @description Interface for the LeaderboardEntry object representing a single entry in the leaderboard
 */
export type LeaderboardEntry = any;

/**
 * @description Interface for the LeaderboardState object representing the state of the leaderboard
 */
export type LeaderboardState = {
  docs: LeaderboardEntry[];
  total: number;
  page: number;
  loading: boolean;
  sort: string;
  order: string;
  savedDate?: string;
};

/**
 * @description Interface for the AppState object representing the state of the app
 */
interface AppState {
  error: string;
  leaderboard: LeaderboardState;
}

const initialState: AppState = {
  error: "",
  leaderboard: {
    docs: JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADERBOARD) || "[]"),
    total: 0,
    page: 1,
    loading: true,
    sort: "txCount",
    order: "desc",
    savedDate: localStorage.getItem(STORAGE_KEYS.LEADERBOARD_SAVED) || "",
  },
};

// Create a Redux slice for the app store with reducer functions
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    /**
     * @description Reducer to set the error state
     */
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    /**
     * @description Reducer to set the leaderboard state
     */
    setLeaderboard(state, action: PayloadAction<Partial<LeaderboardState>>) {
      state.leaderboard = {
        ...state.leaderboard,
        ...action.payload,
      };
    },
    /**
     * @description Reducer to set the leaderboard docs state
     */
    setLeaderboardDocs(state, action: PayloadAction<LeaderboardEntry[]>) {
      state.leaderboard.docs = action.payload;
    },
    /**
     * @description Reducer to add the leaderboard docs to the state
     */
    addLeaderboardDocs(state, action: PayloadAction<LeaderboardEntry[]>) {
      state.leaderboard.docs = [...state.leaderboard.docs, ...action.payload];
    },
  },
});

//
/**
 * @description Selector function to access the app state from the Redux store
 */
export const selectAppStore = (state: RootState) => state.app;

/**
 * @description App store actions generated by createSlice
 */
export const appStoreActions = appSlice.actions;

// Export the reducer function generated by createSlice
export default appSlice.reducer;
