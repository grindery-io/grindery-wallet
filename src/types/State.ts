import { UserType } from "components/shared/User/User";
import { ContactType } from "components/shared/Contact/Contact";
import { TokenType } from "components/shared/Token";
import { SwapRoute } from "./SwapRoute";
import { TelegramUserActivity, TelegramUserReward } from "./Telegram";
import { UserProps } from "./User";
import {
  GetBridgeQuoteResponseType,
  GetOrderQuoteResponseType,
} from "services";

/**
 * Interface for the ActivityState object representing the state of the user activity
 */
export type ActivityState = {
  /**
   * Array of activity items
   */
  items: TelegramUserActivity[];
  /**
   * Array of filter keys
   */
  filters: string[];
  /**
   * Whether the activity is loading
   */
  loading: boolean;
  /**
   * Total number of activities
   */
  total: number;
  /**
   * Skip N activities
   */
  skip: number;
  /**
   * Array of mongodb query objects
   */
  find?: any[];
};

/**
 * Interface for the AppsState object representing the state of the grindery apps
 */
export type AppsState = {
  /**
   * Array of apps
   */
  items?: any[]; // Array of apps
  /**
   * Whether the apps are loading
   */
  loading?: boolean;
  /**
   * When the apps were last updated
   */
  updated?: string;
  /**
   * Array of filter keys
   */
  filters?: string[];
};

/**
 * Interface for the BalanceState object representing the state of the user balance
 */
export type BalanceState = {
  /*
   * balance value
   */
  value?: number;
  /**
   * Whether the balance is loaded from cache
   */
  cached?: boolean;
  /**
   * Whether the balance is loading
   */
  loading?: boolean;
  /**
   * Whether the balance is should be updated
   */
  shouldUpdate: boolean;
  /**
   * When the balance was last updated
   */
  updated?: string;
  /**
   * Display mode
   */
  display: "token" | "usd";
};

export enum BridgeStatus {
  WAITING = "waiting_user_input",
  LOADING = "loading",
  ERROR = "error",
  SENDING = "sending",
  SENT = "sent",
}

export type BridgeStateInput = {
  tokenIn: string;
  amountIn: string;
  tokenOut: string;
  chainIn: string;
  chainOut: string;
};

/**
 * Interface for the BridgeState object representing the state of the bridge page
 */
export type BridgeState = {
  input: BridgeStateInput;
  status: BridgeStatus;
  quote: GetBridgeQuoteResponseType | null;
};

/**
 * Interface for the CommunityState object representing the state of the grindery community
 */
export type CommunityState = {
  /**
   * Array of community items
   */
  items: any[];
  /**
   * Whether the community is loading
   */
  loading: boolean;
  /**
   * When the community was last updated
   */
  updated?: string;
  /**
   * Array of filter keys
   */
  filters?: string[];
};

/**
 * Interface for the ContactsState object representing the state of the user contacts
 */
export type ContactsState = {
  /**
   * Array of contacts
   */
  items?: ContactType[];
  /**
   * Whether the contacts are loading
   */
  loading?: boolean;
  /**
   * When the contacts were last updated
   */
  updated?: string;
  /**
   * Array of filter keys
   */
  filters?: string[];
  /**
   * Array of social contacts
   */
  social?: UserType[];
  /**
   * Whether the social contacts are loading
   */
  socialLoading?: boolean;
};

/**
 * Interface for the ConfigState object representing the state of app configuration
 */
export type ConfigState = {};

/**
 * Interface for the DebugState object representing the state of the debug mode
 */
export type DebugState = {
  /**
   * Whether the debug mode is enabled
   */
  enabled: boolean;
  /**
   * Experimental features toggles
   */
  features?: {
    [key: string]: boolean;
  };
  /**
   * App stats
   */
  stats?: {
    users: {
      total: number;
      new: {
        hour: number;
        day: number;
        history?: { _id: string; count: number }[];
      };
      withContacts: {
        total: number;
        new: {
          hour: number;
          day: number;
          history?: { _id: string; count: number }[];
        };
      };
    };
  };
};

/**
 * Interface for the ErrorState object representing the state of the app errors
 */
export type ErrorState = {
  message?: string;
  code?: number;
  type?: string;
} | null;

export type OrderInput = {
  convert: string;
  add: string;
};

export enum OrderStatus {
  WAITING = "waiting_user_input",
  LOADING = "loading",
  ERROR = "error",
  SENDING = "sending",
  SENT = "sent",
  WAITING_USD_PAYMENT = "waiting_usd_payment",
  PAYING = "paying_usd",
  COMPLETED = "completed",
}

export type OrderQuote = GetOrderQuoteResponseType | null;

export enum OrderDetailsStatus {
  PENDING = "PENDING",
  COMPLETE = "COMPLETE",
  FAILURE = "FAILURE",
  PENDING_USD = "PENDING_USD",
}

/**
 * in eth
 */
export type OrderDetailsG1Amount = string;

export type OrderDetails = {
  orderId: string;
  date: string;
  status: OrderDetailsStatus;
  userTelegramID: string;
  g1_amount: OrderDetailsG1Amount;
  transactionHash?: string;
  userOpHash?: string;
};

/**
 * Interface for the ConvertState object representing the state of the tokens convert page
 */
export type OrderState = {
  input: OrderInput;
  status: OrderStatus;
  quote: OrderQuote;
  details?: OrderDetails | null;
};

/**
 * Interface for the RewardsState object representing the state of the user rewards
 */
export type RewardsState = {
  /**
   * Array of reward items
   */
  docs: TelegramUserReward[] | TelegramUserActivity[];
  /**
   * Total number of rewards
   */
  total: number;
  /**
   * Whether the rewards are loading
   */
  loading: boolean;
  /**
   * Rewards filter
   */
  filter: string;
  /**
   * Array of mongodb query objects
   */
  find?: object[];
  /**
   * Saved date
   */
  savedDate?: string;
};

export enum SendStatus {
  WAITING = "waiting_user_input",
  ERROR = "error",
  SENDING = "sending",
  SENT = "sent",
}

export type SendStateInput = {
  amount: string;
  recipient: string | string[] | null;
  message: string;
  chainId?: string;
  tokenAddress?: string;
};

/**
 * Interface for the SendState object representing the state of the send page
 */
export type SendState = {
  input: SendStateInput;
  status: SendStatus;
  selectedContacts: string[];
};

/**
 * Interface for the StatsState object representing the state of the user stats
 */
export type StatsState = {
  /**
   * Number of sent transactions
   */
  sentTransactions?: number;
  /**
   * Number of rewards
   */
  rewards?: number;
  /**
   * Number of received transactions
   */
  receivedTransactions?: number;
  /**
   * Number of referrals
   */
  referrals?: number;
};

export enum SwapStatus {
  WAITING = "waiting_user_input",
  LOADING = "loading",
  ERROR = "error",
  SENDING = "sending",
  SENT = "sent",
}

export type SwapStateInput = {
  tokenIn: string;
  amountIn: string;
  tokenOut: string;
  chainId?: string;
};

/**
 * Interface for the SwapState object representing the state of the swap page
 */
export type SwapState = {
  input: SwapStateInput;
  status: SwapStatus;
  route: SwapRoute | null;
};

/**
 * Interface for the UserState object representing the state of the current user
 */
export type UserState = UserProps | null;

/**
 * Interface for the AppState object representing the state of the app
 */
export type AppState = {
  /**
   * User activivity state
   */
  activity: ActivityState;
  /**
   * Apps list state
   */
  apps?: AppsState;
  /**
   * User balance state
   */
  balance: BalanceState;
  /**
   * Bridge state
   */
  bridge: BridgeState;
  /**
   * Community list state
   */
  community?: CommunityState;
  /**
   * Contacts list state
   */
  contacts: ContactsState;
  /**
   * App debug mode state
   */
  debug: DebugState;
  /**
   * App error state
   */
  error: ErrorState;
  /**
   * Order tokens state
   */
  order: OrderState;
  /**
   * Rewards list state
   */
  rewards: RewardsState;
  /**
   * Send state
   */
  send: SendState;
  /**
   * User stats state
   */
  stats: StatsState;
  /**
   * Swap state
   */
  swap: SwapState;
  /**
   * Tokens state
   */
  tokens: TokenType[];
  /**
   * Current user state
   */
  user: UserState;
};
