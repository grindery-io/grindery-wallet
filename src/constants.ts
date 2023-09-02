import { Operation, Workflow } from "./types/Workflow";

export const WORKFLOW_ENGINE_URL = "https://orchestrator.grindery.org";

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

const NOTIFICATION = {
  TITLE: "Event detected",
  BODY: "You received a deposit from {{trigger.from}}",
  BODY_NEAR: "You received a deposit from {{trigger.receiver_id}}",
};

export const BLOCKCHAINS = [
  {
    value: "eip155:42161",
    label: "Arbitrum",
    icon: "/images/icons/arbitrum.svg",
    token: "ETH",
  },
  {
    value: "eip155:43114",
    label: "Avalanche",
    icon: "/images/coming-soon/avalanche.png",
    token: "AVAX",
  },
  {
    value: "eip155:56",
    label: "Binance",
    icon: "/images/coming-soon/binance.png",
    token: "BNB",
  },
  {
    value: "eip155:42220",
    label: "Celo",
    icon: "/images/icons/celo.svg",
    token: "CELO",
    tokenAddress: "0x471EcE3750Da237f93B8E339c536989b8978a438",
  },
  {
    value: "eip155:1",
    label: "Ethereum",
    icon: "/images/icons/ethereum.svg",
    token: "ETH",
  },
  {
    value: "eip155:250",
    label: "Fantom",
    icon: "https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_fantom.jpg&w=64&q=75",
    token: "FTM",
  },
  {
    value: "flow:mainnet",
    label: "Flow",
    icon: "/images/icons/flow-black-icon.svg",
  },
  {
    value: "eip155:100",
    label: "Gnosis",
    icon: "/images/icons/gnosis.svg",
    token: "xDAI",
  },
  {
    value: "eip155:1666600000",
    label: "Harmony",
    icon: "/images/coming-soon/harmony.png",
    token: "ONE",
  },
  {
    value: "near:mainnet",
    label: "Near",
    icon: "/images/icons/near-icon.svg",
  },
  {
    value: "eip155:137",
    label: "Polygon",
    icon: "/images/icons/polygon.svg",
    token: "MATIC",
    tokenAddress: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
  },
];

export const EVM_CHAINS = BLOCKCHAINS.filter((chain) =>
  chain.value.includes("eip155")
).map((chain) => chain.value);

// New wallet workflow object
export const walletWorkflow: Workflow = {
  title: "Grindery Ping notifications for Wallet transaction",
  trigger: {
    type: "trigger",
    connector: "evmWallet",
    operation: "newTransaction",
    input: {
      _grinderyChain: EVM_CHAINS,
      to: "",
    },
  },
  actions: [
    {
      type: "action",
      connector: "firebaseCloudMessagingConnector",
      operation: "fcmPushNotification",
      input: {
        tokens: [""],
        title: NOTIFICATION.TITLE,
        body: NOTIFICATION.BODY,
      },
    },
  ],
  creator: "",
  state: "off",
  source: window.location.origin.includes("//localhost")
    ? "urn:grindery-staging:ping"
    : "urn:grindery:ping",
};

// New token workflow object
export const tokenWorkflow: Workflow = {
  title: "Grindery Ping notifications for ERC-20 Token transfer",
  trigger: {
    type: "trigger",
    connector: "erc20",
    operation: "TransferTrigger",
    input: {
      _grinderyChain: EVM_CHAINS,
      _grinderyContractAddress: "0x0",
      to: "",
    },
  },
  actions: [
    {
      type: "action",
      connector: "firebaseCloudMessagingConnector",
      operation: "fcmPushNotification",
      input: {
        tokens: [""],
        title: NOTIFICATION.TITLE,
        body: NOTIFICATION.BODY,
      },
    },
  ],
  creator: "",
  state: "off",
  source: window.location.origin.includes("//localhost")
    ? "urn:grindery-staging:ping"
    : "urn:grindery:ping",
};

export const nearWalletWorkflow: Workflow = {
  title: "Grindery Ping notifications for NEAR Wallet transaction",
  trigger: {
    type: "trigger",
    connector: "near",
    operation: "newTransaction",
    input: {
      _grinderyChain: "near:mainnet",
      to: "",
    },
  },
  actions: [
    {
      type: "action",
      connector: "firebaseCloudMessagingConnector",
      operation: "fcmPushNotification",
      input: {
        tokens: [""],
        title: NOTIFICATION.TITLE,
        body: NOTIFICATION.BODY,
      },
    },
  ],
  creator: "",
  state: "off",
  source: window.location.origin.includes("//localhost")
    ? "urn:grindery-staging:ping"
    : "urn:grindery:ping",
};

export const nearTokenWorkflow: Workflow = {
  title: "Grindery Ping notifications for token transfer on NEAR chain",
  trigger: {
    type: "trigger",
    connector: "near",
    operation: "TokenTransferTrigger",
    input: {
      _grinderyChain: "near:mainnet",
      _grinderyContractAddress: "0x0",
      receiver_id: "",
    },
  },
  actions: [
    {
      type: "action",
      connector: "firebaseCloudMessagingConnector",
      operation: "fcmPushNotification",
      input: {
        tokens: [""],
        title: NOTIFICATION.TITLE,
        body: NOTIFICATION.BODY_NEAR,
      },
    },
  ],
  creator: "",
  state: "off",
  source: window.location.origin.includes("//localhost")
    ? "urn:grindery-staging:ping"
    : "urn:grindery:ping",
};

export const flowWorkflow: Workflow = {
  title: "Grindery Ping notifications for Flow wallet transaction",
  trigger: {
    type: "trigger",
    connector: "flow",
    operation: "TokenTransferTrigger",
    input: {
      _grinderyChain: "flow:mainnet",
      _grinderyContractAddress: "A.1654653399040a61.FlowToken",
      to: "",
    },
  },
  actions: [
    {
      type: "action",
      connector: "firebaseCloudMessagingConnector",
      operation: "fcmPushNotification",
      input: {
        tokens: [""],
        title: NOTIFICATION.TITLE,
        body: NOTIFICATION.BODY,
      },
    },
  ],
  creator: "",
  state: "off",
  source: window.location.origin.includes("//localhost")
    ? "urn:grindery-staging:ping"
    : "urn:grindery:ping",
};

export const subscribeUserAction: Operation = {
  type: "action",
  connector: "firebaseCloudMessagingConnector",
  operation: "subscribeDeviceToTopic",
  input: {
    topic: "grindery-ping-updates",
    tokens: [""],
  },
};

export const unsubscribeUserAction: Operation = {
  type: "action",
  connector: "firebaseCloudMessagingConnector",
  operation: "unsubscribeDeviceFromTopic",
  input: {
    topic: "grindery-ping-updates",
    tokens: [""],
  },
};

export const GRINDERY_APPS = [
  {
    url: "https://flow.grindery.org/",
    name: "Flow",
    description: "Create workflows witn no-code",
    target: "_blank",
  },
  {
    url: "https://ping.grindery.org/",
    name: "Ping",
    description: "Receive blockchain notifications",
    target: "_blank",
  },
  {
    url: "https://gateway.grindery.org/",
    name: "Gateway",
    description: "Your gateway to web3 no-code",
    target: "_blank",
  },
  {
    url: "https://network.grindery.org/",
    name: "CDS",
    description: "Create Connector Description Schema files",
    target: "_blank",
  },
];
