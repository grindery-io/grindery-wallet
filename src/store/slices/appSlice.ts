import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { EXPERIMENTAL_FEATURES, STORAGE_KEYS } from "../../constants";
import { TelegramUserActivity, TelegramUserReward } from "../../types/Telegram";
import { UserProps } from "../../types/User";

/**
 * Interface for the LeaderboardEntry object representing a single entry in the leaderboard
 */
export type LeaderboardEntry = any;

/**
 * Interface for the LeaderboardState object representing the state of the leaderboard
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
 * Interface for the RewardsState object representing the state of the user rewards
 */
export type RewardsState = {
  docs: TelegramUserReward[] | TelegramUserActivity[];
  total: number;
  loading: boolean;
  filter: string;
  find?: object[];
  savedDate?: string;
};

/**
 * Interface for the UserState object representing the state of the current user
 */
export type UserState = UserProps | null;

/**
 * Interface for the DebugState object representing the state of the debug mode
 */
export type DebugState = {
  enabled: boolean;
  features?: {
    [key: string]: boolean;
  };
};

/**
 * Interface for the BalanceState object representing the state of the user balance
 */
export type BalanceState = {
  value?: number;
  cached?: boolean;
  loading?: boolean;
  updated?: string;
};

/**
 * Interface for the AppState object representing the state of the app
 */
interface AppState {
  balance: BalanceState;
  debug: DebugState;
  error: string;
  leaderboard: LeaderboardState;
  rewards: RewardsState;
  user: UserState;
}

const initialState: AppState = {
  balance: {},
  debug: {
    enabled: localStorage.getItem("grindery_wallet_dev_mode") === "true",
    features: Object.fromEntries(
      Object.keys(EXPERIMENTAL_FEATURES).map((key) => [
        key,
        localStorage.getItem(`grindery_wallet_features_${key}`) === "true",
      ])
    ),
  },
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
  rewards: {
    docs: JSON.parse(localStorage.getItem(STORAGE_KEYS.REWARDS) || "[]"),
    total: 0,
    loading: true,
    filter: "received",
    savedDate: localStorage.getItem(STORAGE_KEYS.REWARDS_SAVED) || "",
  },
  user: null,
};

// Create a Redux slice for the app store with reducer functions
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    /**
     * Reducer to set the error state
     */
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    /**
     * Reducer to set the leaderboard state
     */
    setLeaderboard(state, action: PayloadAction<Partial<LeaderboardState>>) {
      state.leaderboard = {
        ...state.leaderboard,
        ...action.payload,
      };
    },
    /**
     * Reducer to set the leaderboard docs state
     */
    setLeaderboardDocs(state, action: PayloadAction<LeaderboardEntry[]>) {
      state.leaderboard.docs = action.payload;
    },
    /**
     * Reducer to add the leaderboard docs to the state
     */
    addLeaderboardDocs(state, action: PayloadAction<LeaderboardEntry[]>) {
      state.leaderboard.docs = [...state.leaderboard.docs, ...action.payload];
    },
    /**
     * Reducer to set the rewards state
     */
    setRewards(state, action: PayloadAction<Partial<RewardsState>>) {
      state.rewards = {
        ...state.rewards,
        ...action.payload,
      };
    },
    /**
     * Reducer to add reward docs to the rewards state
     */
    addRewardDocs(
      state,
      action: PayloadAction<TelegramUserReward[] | TelegramUserActivity[]>
    ) {
      state.rewards = {
        ...state.rewards,
        docs: [...state.rewards.docs, ...action.payload] as Draft<
          TelegramUserReward[] | TelegramUserActivity[]
        >,
      };
    },
    /**
     * Reducer to set the user state
     */
    setUser(state, action: PayloadAction<UserState>) {
      state.user = action.payload;
    },
    /**
     * Reducer to set the debug state
     */
    setDebug(state, action: PayloadAction<Partial<DebugState>>) {
      state.debug = {
        ...state.debug,
        ...action.payload,
      };
    },
    /**
     * Reducer to set the debug features state
     */
    setDebugFeatures(state, action: PayloadAction<{ [key: string]: boolean }>) {
      state.debug.features = {
        ...state.debug.features,
        ...action.payload,
      };
    },
    /**
     * Reducer to set the balance state
     */
    setBalance(state, action: PayloadAction<Partial<BalanceState>>) {
      state.balance = {
        ...state.balance,
        ...action.payload,
      };
    },
  },
});

//
/**
 * Selector function to access the app state from the Redux store
 */
export const selectAppStore = (state: RootState) => state.app;

/**
 * App store actions generated by createSlice
 */
export const appStoreActions = appSlice.actions;

// Export the reducer function generated by createSlice
export default appSlice.reducer;
