export const BOT_API_URL =
  process.env.REACT_APP_ENV === "development"
    ? "http://localhost:3000"
    : process.env.REACT_APP_ENV === "production"
    ? "https://wallet-api.grindery.io"
    : "https://wallet-api-staging.grindery.io";

export const MAX_WIDTH = "768px";

export const ICONS: { [key: string]: string } = {
  GRINDERY: "/images/icons/grindery.svg",
  CERAMIC_LOGO: "/images/icons/ceramic-logo.svg",
  METAMASK_LOGO: "/images/icons/metamask-logo.svg",
  DISCONNECT: "/images/icons/disconnect.svg",
  CHECKBOX_CHECKED: "/images/icons/checkbox-checked.svg",
  CHECKBOX_EMPTY: "/images/icons/checkbox-empty.svg",
  WALLET: "/images/icons/wallet.svg",
  CLOSE: "/images/icons/cross-circle.svg",
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

export const TOKENS = [
  {
    symbol: "G1",
    name: "Grindery One",
    balance: "0",
    icon: "/images/g1-token-red.svg",
    address: "0xe36BD65609c08Cd17b53520293523CF4560533d0",
  },
  {
    symbol: "MATIC",
    name: "Polygon Matic",
    balance: "0",
    icon: "https://polygonscan.com/assets/poly/images/svg/logos/polygon-token.svg",
    disabled: true,
    address: "0x0",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: "0",
    icon: "https://polygonscan.com/token/images/centre-usdc_32.png",
    disabled: true,
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  },
];

export const BOT_URL = "https://t.me/GrinderyAIBot";

export const EXPERIMENTAL_FEATURES = {
  SEND_MESSAGE: "Message sending",
  BATCH_SENDING: "Batch token sending",
  COLORED_NUMBERS: "Tokens amount colored",
  LEADERBOARD: "Leaderboard",
  CONTACT_PHOTOS: "Contact photos",
  SWAP: "Tokens swap",
  TOKEN_PRICE: "Token prices in USD",
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
  EXPERIMENTAL_FEATURES: "gr_wallet_features_{{key}}",
  CONTACTS: "gr_wallet_contacts",
  CONTACTS_UPDATED: "gr_wallet_contacts_updated",
  APP_USER: "gr_wallet_app_user_{{id}}",
  CONTACT_PHOTO: "gr_wallet_contact_photo_{{id}}",
  BALANCE: "gr_wallet_balance_{{id}}",
  BALANCE_UPDATED: "gr_wallet_balance_updated_{{id}}",
  ACTIVITY: "gr_wallet_activity",
  INIT_DATA: "gr_wallet_init_data",
  TOKEN_BALANCE: "gr_wallet_token_balance_{{key}}",
  TOKENS: "gr_wallet_tokens",
};

export const BOTTOM_TABS = [
  {
    label: "Tokens",
    path: "/tokens",
  },
  {
    label: "Contacts",
    path: "/contacts",
  },
  {
    label: "Rewards",
    path: "/rewards",
  },
  {
    label: "Apps",
    path: "/apps",
  },
  {
    label: "Community",
    path: "/community",
  },
];

export const TOKENS_TABS = [
  {
    label: "Tokens",
    path: "/tokens",
  },
  {
    label: "NFTs",
    path: "/nfts",
  },
  {
    label: "Activity",
    path: "/activities",
  },
];

export const TELEGRAM_SERVERS = [
  {
    ip: "pluto.web.telegram.org",
    port: 443,
  },
  {
    ip: "pluto-1.web.telegram.org",
    port: 443,
  },
  {
    ip: "venus.web.telegram.org",
    port: 443,
  },
  {
    ip: "venus-1.web.telegram.org",
    port: 443,
  },
  {
    ip: "aurora.web.telegram.org",
    port: 443,
  },
  {
    ip: "aurora-1.web.telegram.org",
    port: 443,
  },
  {
    ip: "vesta.web.telegram.org",
    port: 443,
  },
  {
    ip: "vesta-1.web.telegram.org",
    port: 443,
  },
  {
    ip: "vesflorata.web.telegram.org",
    port: 443,
  },
  {
    ip: "flora-1.web.telegram.org",
    port: 443,
  },
];

export const DEFAULT_TOKENS = [
  {
    id: "0xe36BD65609c08Cd17b53520293523CF4560533d0",
    chainId: 137,
    name: "Grindery One",
    symbol: "G1",
    address: "0xe36BD65609c08Cd17b53520293523CF4560533d0",
    decimals: 18,
    logoURI: "/images/g1-token-red.svg",
    balance: 0,
  },
  {
    id: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    chainId: 137,
    name: "MATIC",
    symbol: "MATIC",
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    decimals: 18,
    logoURI:
      "https://metadata-service.herokuapp.com/api/token/137/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/icon",
    balance: 0,
  },
  {
    id: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
    chainId: 137,
    name: "Native USD Coin (PoS)",
    symbol: "USDC",
    address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
    decimals: 6,
    logoURI:
      "https://metadata-service.herokuapp.com/api/token/137/0x2791bca1f2de4661ed88a30c99a7a9449aa84174/icon",
    balance: 0,
  },
];

export const DEFAULT_TOKEN_ICON_URL =
  "https://polygonscan.com/assets/poly/images/svg/empty-token.svg";

export const MAIN_TOKEN_ADDRESS = "0xe36BD65609c08Cd17b53520293523CF4560533d0";

export const USDCE_TOKEN_ADDRESS = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
export const USDC_TOKEN_ADDRESS = "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359";

export const BLOCKCHAIN_NAMES: {
  [chain: string]: string;
} = {
  "137": "Polygon",
  "1": "Ethereum",
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
