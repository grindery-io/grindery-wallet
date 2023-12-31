import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import { RootState } from "store";
import {
  EXPERIMENTAL_FEATURES,
  GRINDERY_ONE_TOKEN,
  STORAGE_KEYS,
} from "../../constants";
import {
  AppState,
  AppsState,
  BalanceState,
  CommunityState,
  ContactsState,
  DebugState,
  ErrorState,
  RewardsState,
  SendState,
  SendStatus,
  StatsState,
  SwapState,
  SwapStatus,
  UserState,
  TelegramUserActivity,
  TelegramUserReward,
  BridgeStatus,
  BridgeState,
  OrderState,
  TGEStatus,
  TGEState,
  TGEInput,
} from "types";
import { fixTokens } from "utils";
import { TokenType } from "components/shared/Token";
import _ from "lodash";

export const initialState: AppState = {
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
  balance: {
    ...(JSON.parse(
      localStorage.getItem(STORAGE_KEYS.BALANCE) || '{ "value": 0 }'
    ) || {}),
    shouldUpdate: true,
    loading: true,
    display:
      JSON.parse(
        localStorage.getItem(STORAGE_KEYS.BALANCE) || '{ "display": "token" }'
      )?.display || "token",
  },
  bridge: {
    input: {
      tokenIn: "",
      amountIn: "",
      tokenOut: "",
      chainIn: "",
      chainOut: "",
    },
    status: BridgeStatus.WAITING,
    quote: null,
  },
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
    social: localStorage.getItem(STORAGE_KEYS.SOCIAL_CONTACTS)
      ? JSON.parse(localStorage.getItem(STORAGE_KEYS.SOCIAL_CONTACTS) || "[]")
      : undefined,
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
  error: null,
  rewards: {
    docs: JSON.parse(localStorage.getItem(STORAGE_KEYS.REWARDS) || "[]"),
    total: 0,
    loading: true,
    filter: "pending",
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
  swap: {
    input: {
      tokenIn: "",
      amountIn: "",
      tokenOut: "",
    },
    status: SwapStatus.WAITING,
    route: null,
  },
  tge: {
    input: {
      g1Quantity: "",
      usdQuantity: "",
    },
    status: TGEStatus.WAITING,
    quote: null,
  },
  tokens: JSON.parse(
    localStorage.getItem(STORAGE_KEYS.TOKENS) ||
      JSON.stringify([{ ...GRINDERY_ONE_TOKEN }])
  ).map(fixTokens),
  user: null,
};

// Create a Redux slice for the app store with reducer functions
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
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
     * Reducer to set the error state
     */
    setError(state, action: PayloadAction<Partial<ErrorState>>) {
      state.error =
        action.payload === null
          ? null
          : {
              ...state.error,
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
     * Reducer to set the bridge state
     */
    setBridge(state, action: PayloadAction<Partial<BridgeState>>) {
      state.bridge = {
        ...state.bridge,
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
     * Reducer to set the contacts state
     */
    setContacts(state, action: PayloadAction<ContactsState>) {
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
     * Reducer to set the activity items state
     */
    setActivityItems(state, action: PayloadAction<any[]>) {
      state.activity.items = action.payload;
    },
    /**
     * Reducer to add the activity items to the state
     */
    addActivityItems(state, action: PayloadAction<any[]>) {
      state.activity.items = [...state.activity.items, ...action.payload];
    },
    /**
     * Reducer to set the send state
     */
    setSend(state, action: PayloadAction<Partial<SendState>>) {
      state.send = {
        ...state.send,
        ...action.payload,
      };
    },
    /**
     * Reducer to set the swap state
     */
    setSwap(state, action: PayloadAction<Partial<SwapState>>) {
      state.swap = {
        ...state.swap,
        ...action.payload,
      };
    },
    /**
     * Reducer to set the tokens state
     */
    setTokens(state, action: PayloadAction<TokenType[]>) {
      state.tokens = action.payload;
    },
    updateTokens(state, action: PayloadAction<TokenType[]>) {
      state.tokens = _.uniqBy(
        [
          ...state.tokens.map((token) => {
            const payloadToken = action.payload.find(
              (t) =>
                t.address.toLowerCase() === token.address.toLowerCase() &&
                t.chain === token.chain
            );
            if (payloadToken) {
              return {
                ...payloadToken,
                icon: token.icon || payloadToken.icon || "",
              };
            } else {
              return { ...token, balance: "0" };
            }
          }),
          ...action.payload.filter(
            (token) =>
              !state.tokens.find(
                (t) =>
                  t.address.toLowerCase() === token.address.toLowerCase() &&
                  t.chain === token.chain
              )
          ),
        ],
        (token) => token.address.toLowerCase() + token.chain
      );
    },
    /**
     * Reducer to set the order state
     */
    setOrder(state, action: PayloadAction<OrderState>) {
      state.order = action.payload;
    },
    setTGE(state, action: PayloadAction<Partial<TGEState>>) {
      state.tge = {
        ...state.tge,
        ...action.payload,
      };
    },
    setTGEInput(state, action: PayloadAction<Partial<TGEInput>>) {
      state.tge.input = {
        ...state.tge.input,
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
