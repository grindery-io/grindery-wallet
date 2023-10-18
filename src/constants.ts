export const WORKFLOW_ENGINE_URL = "https://orchestrator.grindery.org";

export const BOT_API_URL =
  process.env.REACT_APP_ENV === "development"
    ? "http://localhost:3000"
    : process.env.REACT_APP_ENV === "production"
    ? "https://wallet-api.grindery.io"
    : "https://wallet-api-staging.grindery.io";

export const MAX_WIDTH = "768px";

export const SCREEN = {
  TABLET: "768px",
  TABLET_XL: "1024px",
  DESKTOP: "1280px",
  DESKTOP_XL: "1600px",
};

export const ICONS: { [key: string]: string } = {
  GRINDERY: "/images/icons/grindery.svg",
  CERAMIC_LOGO: "/images/icons/ceramic-logo.svg",
  METAMASK_LOGO: "/images/icons/metamask-logo.svg",
  DISCONNECT: "/images/icons/disconnect.svg",
  CHECKBOX_CHECKED: "/images/icons/checkbox-checked.svg",
  CHECKBOX_EMPTY: "/images/icons/checkbox-empty.svg",
  WALLET: "/images/icons/wallet.svg",
  CLOSE: "images/icons/cross-circle.svg",
  COPY: "/images/icons/copy.svg",
  FLOW_LOGO: "/images/icons/flow-logo.png",
  ACCOUNT: "/images/icons/account.svg",
  CROSS: "/images/icons/cross.svg",
  // Socials
  SOCIAL_DISCORD: "/images/icons/social-discord.png",
  SOCIAL_TG: "/images/icons/social-tg.png",
  SOCIAL_TWITTER: "/images/icons/social-twitter.png",
  ARROW_OPEN: "/images/icons/arrow-open.svg",
  CONTACTS: "/images/icons/user-circle.svg",
};

export const WEB2_CONNECTORS_PATH =
  "https://api.github.com/repos/grindery-io/grindery-nexus-schema-v2/contents/cds/web2";

export const WEB3_CONNECTORS_PATH =
  "https://api.github.com/repos/grindery-io/grindery-nexus-schema-v2/contents/cds/web3";

export const IMAGES = {
  WELCOME: "/images/welcome.png",
  NOT_SUPOORTED: "/images/grindery-ping-not-supported.svg",
  ENABLE_NOTIFICATIONS: "/images/grindery-ping-enable-notifications.svg",
  ENABLE_NOTIFICATIONS_CHROME:
    "/images/grindery-ping-enable-notifications-chrome.svg",
  ENABLE_NOTIFICATIONS_FIREFOX:
    "/images/grindery-ping-enable-notifications-firefox.svg",
};

export const TOKENS = [
  {
    symbol: "G1",
    name: "Grindery One",
    balance: "0",
    icon: "/images/g1-token-red.svg",
  },
  {
    symbol: "MATIC",
    name: "Polygon Matic",
    balance: "0",
    icon: "https://polygonscan.com/images/svg/brands/matic.svg",
    disabled: true,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: "0",
    icon: "https://polygonscan.com/token/images/centre-usdc_32.png",
    disabled: true,
  },
];

export const BOT_URL = "https://t.me/GrinderyAIBot";

export const EXPERIMENTAL_FEATURES = {
  SEND_MESSAGE: "Message sending",
  BATCH_SENDING: "Batch token sending",
  COLORED_NUMBERS: "Tokens amount colored",
  LEADERBOARD: "Leaderboard",
  CONTACT_PHOTOS: "Contact photos",
};

export const TRANSACTION_STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILURE: "failure",
  PENDING_HASH: "pending_hash",
};

export const STORAGE_KEYS = {
  LEADERBOARD: "gr_wallet_leaderboard",
  LEADERBOARD_SAVED: "gr_wallet_leaderboard_saved",
  REWARDS: "gr_wallet_rewards",
  REWARDS_SAVED: "gr_wallet_rewards_saved",
  APPS: "gr_wallet_apps",
  APPS_UPDATED: "gr_wallet_apps_updated",
  COMMUNITY: "gr_wallet_community",
  COMMUNITY_UPDATED: "gr_wallet_community_updated",
  CONFIG: "gr_wallet_config",
  DEBUG: "gr_wallet_debug",
  EXPERIMENTAL_FEATURES: "grindery_wallet_features_{{key}}",
};

/* 
var(--tg-theme-secondary-bg-color, #efeff3)
var(--tg-theme-button-color, #2481cc)
var(--tg-theme-button-text-color, #ffffff)
var(--tg-theme-hint-color, #999999)
var(--tg-theme-link-color, #2481cc)
var(--tg-theme-bg-color, #ffffff)
var(--tg-theme-text-color, #000000)
var(--gr-theme-divider-color)
var(--gr-theme-button-shadow-color)
var(--gr-theme-success-color)
var(--tg-theme-accent-pale)
*/
