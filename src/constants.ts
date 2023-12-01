import { ChainType } from "components/shared/Chain/Chain";

export const WALLET_API_URL =
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
  CONTACT_PHOTOS: "Contact photos",
  SWAP: "Tokens swap",
  SOCIAL_CONTACTS: "Social contacts",
  MULTICHAIN: "Multichain support",
  BRIDGE: "Tokens bridge (requires multichain)",
  SEND_NATIVE: "Native token sending",
  ON_RAMP: "Fiat-to-crypto On-ramp",
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
  BALANCE: "gr_wallet_balance",
  ACTIVITY: "gr_wallet_activity",
  INIT_DATA: "gr_wallet_init_data",
  TOKEN_BALANCE: "gr_wallet_token_balance_{{key}}",
  TOKENS: "gr_wallet_tokens",
  SOCIAL_CONTACTS: "gr_wallet_social_contacts",
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

export const GRINDERY_ONE_TOKEN = {
  name: "Grindery One",
  symbol: "G1",
  decimals: 18,
  address: "0xe36BD65609c08Cd17b53520293523CF4560533d0",
  icon: "/images/g1-token-red.svg",
  chain: "137",
  balance: "0",
  price: "0",
};

export const CHAINS: ChainType[] = [
  {
    id: "137",
    caipId: "eip155:137",
    name: "polygon",
    logo: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTAwIDUwMCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmZmY7fS5jbHMtMntjbGlwLXBhdGg6dXJsKCNjbGlwcGF0aCk7fS5jbHMtM3tmaWxsOm5vbmU7fS5jbHMtNHtmaWxsOnVybCgjbGluZWFyLWdyYWRpZW50KTt9PC9zdHlsZT48Y2xpcFBhdGggaWQ9ImNsaXBwYXRoIj48Y2lyY2xlIGNsYXNzPSJjbHMtMyIgY3g9IjI1MCIgY3k9IjI1MCIgcj0iMjQ0LjkxIi8+PC9jbGlwUGF0aD48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9Ii0xMTYuMDkiIHkxPSIyNS45NyIgeDI9IjQzNy40NSIgeTI9IjM2NC43MSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2EyMjljNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzdiM2ZlNCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIGNsYXNzPSJjbHMtMiI+PHJlY3QgY2xhc3M9ImNscy00IiB4PSItMTguMSIgeT0iLTE4LjEiIHdpZHRoPSI1MzYuMiIgaGVpZ2h0PSI1MzYuMiIvPjwvZz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Im0zMjAuODMsMzAyLjg1bDY5LjI5LTQwLjAxYzMuNjctMi4xMiw1Ljk0LTYuMDYsNS45NC0xMC4zdi04MC4wMWMwLTQuMjMtMi4yOC04LjE4LTUuOTQtMTAuM2wtNjkuMjktNDAuMDFjLTMuNjctMi4xMi04LjIyLTIuMTEtMTEuODksMGwtNjkuMjksNDAuMDFjLTMuNjcsMi4xMi01Ljk0LDYuMDctNS45NCwxMC4zdjE0Mi45OWwtNDguNTksMjguMDUtNDguNTktMjguMDV2LTU2LjExbDQ4LjU5LTI4LjA1LDMyLjA1LDE4LjV2LTM3LjY0bC0yNi4xMS0xNS4wN2MtMS44LTEuMDQtMy44Ni0xLjU5LTUuOTUtMS41OXMtNC4xNS41NS01Ljk0LDEuNTlsLTY5LjI5LDQwLjAxYy0zLjY3LDIuMTItNS45NCw2LjA2LTUuOTQsMTAuM3Y4MC4wMWMwLDQuMjMsMi4yOCw4LjE4LDUuOTQsMTAuM2w2OS4yOSw0MC4wMWMzLjY2LDIuMTEsOC4yMiwyLjExLDExLjg5LDBsNjkuMjktNDBjMy42Ny0yLjEyLDUuOTQtNi4wNyw1Ljk0LTEwLjN2LTE0Mi45OWwuODgtLjUsNDcuNzEtMjcuNTUsNDguNTksMjguMDV2NTYuMTFsLTQ4LjU5LDI4LjA1LTMyLTE4LjQ4djM3LjY0bDI2LjA2LDE1LjA1YzMuNjcsMi4xMSw4LjIyLDIuMTEsMTEuODksMFoiLz48L3N2Zz4=",
    label: "Polygon",
    testnet: false,
  },
  {
    id: "59144",
    caipId: "eip155:59144",
    name: "linea",
    logo: "data:image/webp;base64,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",
    label: "Linea",
    testnet: false,
  },
];

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
