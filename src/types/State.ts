import { TelegramUserActivity, TelegramUserReward } from "./Telegram";
import { UserProps } from "./User";

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
};

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
 * Interface for the AppState object representing the state of the app
 */
export type AppState = {
  apps?: AppsState;
  balance: BalanceState;
  community?: CommunityState;
  config: any;
  debug: DebugState;
  leaderboard: LeaderboardState;
  rewards: RewardsState;
  user: UserState;
};