import { SwapRoute } from "./SwapRoute";
import { TelegramUserActivity, TelegramUserReward } from "./Telegram";
import { UserProps } from "./User";

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
  items?: any[];
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

/**
 * Interface for the LeaderboardEntry object representing a single entry in the leaderboard
 */
export type LeaderboardEntry = any;

/**
 * Interface for the LeaderboardState object representing the state of the leaderboard
 */
export type LeaderboardState = {
  /**
   * Array of leaderboard entries
   */
  docs: LeaderboardEntry[];
  /**
   * Total number of entries
   */
  total: number;
  /**
   * Current page
   */
  page: number;
  /**
   * Whether the leaderboard is loading
   */
  loading: boolean;
  /**
   * Sort key
   */
  sort: string;
  /**
   * Sort order
   */
  order: string;
  /**
   * Saved date
   */
  savedDate?: string;
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

/**
 * Interface for the SendState object representing the state of the send page
 */
export type SendState = {
  input: {
    amount: string;
    recipient: string | string[] | null;
    message: string;
  };
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

/**
 * Interface for the SwapState object representing the state of the swap page
 */
export type SwapState = {
  input: {
    tokenIn: string;
    amountIn: string;
    tokenOut: string;
  };
  status: SwapStatus;
  route: SwapRoute | null;
};

export type Token = {
  id: string;
  chainId: number;
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  logoURI: string;
  balance?: number;
  cached?: boolean;
  loading?: boolean;
  shouldUpdate?: boolean;
  updated?: string;
};

/**
 * Interface for the TokensState object representing the state of the tokens
 */
export type TokensState = {
  /**
   * Array of tokens
   */
  items: Token[];
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
   * Leaderboard list state
   */
  leaderboard: LeaderboardState;
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
  tokens: TokensState;
  /**
   * Current user state
   */
  user: UserState;
};
