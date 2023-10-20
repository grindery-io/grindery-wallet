import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { EXPERIMENTAL_FEATURES, STORAGE_KEYS } from "../../constants";
import { TelegramUserActivity, TelegramUserReward } from "../../types/Telegram";
import {
  AppState,
  AppsState,
  BalanceState,
  CommunityState,
  DebugState,
  LeaderboardEntry,
  LeaderboardState,
  RewardsState,
  SendStatus,
  StatsState,
  UserState,
} from "../../types/State";

const initialState: AppState = {
  activity: {
    items: JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITY) || "[]"),
    filters: [],
    loading: true,
    total: JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITY) || "[]")
      .length,
    skip: 0,
  },
  apps: {
    items: JSON.parse(localStorage.getItem(STORAGE_KEYS.APPS) || "[]"),
    loading: true,
    updated: localStorage.getItem(STORAGE_KEYS.APPS_UPDATED) || "",
  },
  balance: {},
  community: {
    items: JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMUNITY) || "[]"),
    loading: true,
    updated: localStorage.getItem(STORAGE_KEYS.COMMUNITY_UPDATED) || "",
  },
  contacts: {
    items: localStorage.getItem(STORAGE_KEYS.CONTACTS)
      ? JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACTS) || "[]")
      : undefined,
    loading: true,
    filters: [],
    updated: localStorage.getItem(STORAGE_KEYS.CONTACTS_UPDATED) || undefined,
  },
  debug: {
    enabled: localStorage.getItem(STORAGE_KEYS.DEBUG) === "true",
    features: Object.fromEntries(
      Object.keys(EXPERIMENTAL_FEATURES).map((key) => [
        key,
        localStorage.getItem(
          STORAGE_KEYS.EXPERIMENTAL_FEATURES.replace("{{key}}", key)
        ) === "true",
      ])
    ),
  },
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
  send: {
    input: {
      amount: "",
      recipient: null,
      message: "",
    },
    status: SendStatus.WAITING,
    selectedContacts: [],
  },
  stats: {},
  tokensTab: 0,
  user: null,
};

// Create a Redux slice for the app store with reducer functions
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
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
    /**
     * Reducer to set the community state
     */
    setCommunity(state, action: PayloadAction<Partial<CommunityState>>) {
      // @ts-ignore
      state.community = {
        ...(state.community || {}),
        ...action.payload,
      };
    },
    /**
     * Reducer to set the apps state
     */
    setApps(state, action: PayloadAction<Partial<AppsState>>) {
      state.apps = {
        ...state.apps,
        ...action.payload,
      };
    },
    /**
     * Reducer to set the user stats state
     */
    setStats(state, action: PayloadAction<Partial<StatsState>>) {
      state.stats = {
        ...state.stats,
        ...action.payload,
      };
    },
    /**
     * Reducer to set the tokens tab state
     */
    setTokensTab(state, action: PayloadAction<number>) {
      state.tokensTab = action.payload;
    },
    /**
     * Reducer to set the contacts state
     */
    setContacts(state, action: PayloadAction<any>) {
      state.contacts = {
        ...state.contacts,
        ...action.payload,
      };
    },
    /**
     * Reducer to set the activity state
     */
    setActivity(state, action: PayloadAction<any>) {
      state.activity = {
        ...state.activity,
        ...action.payload,
      };
    },
    /**
     * Reducer to set the send state
     */
    setSend(state, action: PayloadAction<any>) {
      state.send = {
        ...state.send,
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
