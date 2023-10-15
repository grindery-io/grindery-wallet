import axios from "axios";
import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { BOT_API_URL, EXPERIMENTAL_FEATURES } from "../constants";
import {
  TelegramUserActivity,
  TelegramUserContact,
  TelegramUserReward,
} from "../types/Telegram";
import { UserProps } from "../types/User";

type StateProps = {
  user: UserProps | null;
  loading: boolean;
  error: string;
  activeTab: string;
  contacts?: TelegramUserContact[];
  balance?: number;
  balanceCached?: boolean;
  balanceLoading?: boolean;
  balanceUpdated?: string;
  activity: TelegramUserActivity[];
  contactsLoading: boolean;
  contactsFilters: string[];
  rewardsFilters: string[];
  activityFilters: string[];
  activityLoading: boolean;
  activityTotal: number;
  activitySkip: number;
  activityFind?: any[];
  rewards: {
    received: TelegramUserReward[];
    pending: TelegramUserActivity[];
  };
  rewardsLoading: boolean;
  bannerShown: boolean;
  config?: any;
  communityFilters: string[];
  devMode: {
    enabled: boolean;
    features?: {
      [key: string]: boolean;
    };
  };
  tokensTab: number;
  stats?: any;
};

// Context props
type ContextProps = {
  state: StateProps;
  photos?: { [key: string]: string };
  setState: (newState: Partial<StateProps>) => void;
  getBalance: (a?: boolean) => void;
  getTgActivity: () => void;
  getTgRewards: () => void;
  getTgContacts: () => void;
};

// Context provider props
type AppContextProps = {
  children: React.ReactNode;
};

const defaultContext = {
  state: {
    user: null,
    loading: false,
    error: "",
    sessionLoading: true,
    activeTab: "tokens",
    activity: JSON.parse(localStorage.getItem("gr_wallet_activity") || "[]"),
    contactsLoading: true,
    contactsFilters: [],
    rewardsFilters: [],
    activityFilters: [],
    activityLoading: true,
    activityTotal: JSON.parse(
      localStorage.getItem("gr_wallet_activity") || "[]"
    ).length,
    activitySkip: 0,
    rewards: localStorage.getItem("gr_wallet_rewards")
      ? JSON.parse(localStorage.getItem("gr_wallet_rewards") || "[]")
      : {
          received: [],
          pending: [],
        },
    rewardsLoading: true,
    bannerShown: true,
    communityFilters: [],
    config: localStorage.getItem("grindery_wallet_config")
      ? JSON.parse(localStorage.getItem("grindery_wallet_config") || "[]")
      : undefined,
    devMode: {
      enabled: localStorage.getItem("grindery_wallet_dev_mode") === "true",
      features: Object.fromEntries(
        Object.keys(EXPERIMENTAL_FEATURES).map((key) => [
          key,
          localStorage.getItem(`grindery_wallet_features_${key}`) === "true",
        ])
      ),
    },
    tokensTab: 0,
    contacts: localStorage.getItem("gr_wallet_contacts")
      ? JSON.parse(localStorage.getItem("gr_wallet_contacts") || "[]")
      : undefined,
  },
  setState: () => {},
  getBalance: () => {},
  getTgActivity: () => {},
  getTgRewards: () => {},
  getTgContacts: () => {},
};

// Init context
export const AppContext = createContext<ContextProps>(defaultContext);

export const AppContextProvider = ({ children }: AppContextProps) => {
  const [photos, setPhotos] = useState<{ [key: string]: string }>({});
  const [state, setState] = useReducer(
    (state: StateProps, newState: Partial<StateProps>) => ({
      ...state,
      ...newState,
    }),
    {
      ...defaultContext.state,
    }
  );

  const getMe = useCallback(async () => {
    try {
      const res = await axios.get(`${BOT_API_URL}/v1/me`, {
        headers: {
          Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
        },
      });

      if (res?.data?._id) {
        setState({
          user: res.data,
        });
      }
    } catch (error) {
      setState({
        user: null,
      });
    }
  }, []);

  const getStats = useCallback(async () => {
    try {
      const res = await axios.get(`${BOT_API_URL}/v1/stats`, {
        headers: {
          Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
        },
      });

      setState({
        stats: res.data,
      });
    } catch (error) {}
  }, []);

  const getTgActivity = useCallback(async () => {
    if (!window.Telegram?.WebApp?.initData) {
      return;
    }
    setState({
      activityLoading: true,
    });
    try {
      const find = [...(state.activityFind || [])];
      const filters: any = {
        $or: [],
      };
      if (state.activityFilters.includes("received")) {
        filters["$or"].push({
          recipientTgId: state.user?.userTelegramID,
        });
      }
      if (state.activityFilters.includes("sent")) {
        filters["$or"].push({
          senderTgId: state.user?.userTelegramID,
        });
      }
      if (filters["$or"].length > 0) {
        find.push(filters);
      }

      const res = await axios.get(
        `${BOT_API_URL}/v2/activity?limit=15&find=${JSON.stringify(find)}`,
        {
          headers: {
            Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
          },
        }
      );
      setState({
        activity: res.data?.docs || [],
        activityTotal: res.data?.total || 0,
      });
      localStorage.setItem(
        `gr_wallet_activity`,
        JSON.stringify(res.data?.docs || [])
      );
    } catch (error) {
      console.error("getTgActivity error", error);
    }
    setState({
      activityLoading: false,
    });
  }, [state.activityFind, state.user, state.activityFilters]);

  const getTgRewards = useCallback(async () => {
    if (!window.Telegram?.WebApp?.initData) {
      return;
    }
    setState({
      rewardsLoading: true,
    });
    try {
      const res = await axios.get(`${BOT_API_URL}/v1/rewards`, {
        headers: {
          Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
        },
      });
      const rewards = {
        pending: (res.data?.pending || []).sort(
          (a: TelegramUserActivity, b: TelegramUserActivity) =>
            Date.parse(b.dateAdded) - Date.parse(a.dateAdded)
        ),
        received: (res.data?.received || []).sort(
          (a: TelegramUserReward, b: TelegramUserReward) =>
            Date.parse(b.dateAdded) - Date.parse(a.dateAdded)
        ),
      };
      setState({
        rewards,
      });
      localStorage.setItem(`gr_wallet_rewards`, JSON.stringify(rewards));
    } catch (error) {
      console.error("getTgRewards error", error);
    }
    setState({
      rewardsLoading: false,
    });
  }, []);

  const getTgContacts = useCallback(async () => {
    if (!window.Telegram?.WebApp?.initData || !state.user?.telegramSession) {
      return;
    }
    setState({
      contactsLoading: true,
    });
    try {
      const res = await axios.get(`${BOT_API_URL}/v1/contacts`, {
        headers: {
          Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
        },
      });
      setState({
        contacts: res.data || [],
      });
      localStorage.setItem(
        `gr_wallet_contacts`,
        JSON.stringify(res.data || [])
      );
    } catch (error) {
      console.error("getTgContacts error", error);
      setState({
        contacts: [],
        user: state.user?._id
          ? {
              ...state.user,
              telegramSession: "",
            }
          : null,
      });
    }
    setState({
      contactsLoading: false,
    });
  }, [state.user]);

  const getBalance = useCallback(
    async (a?: boolean) => {
      if (!state.user?.patchwallet) {
        return;
      }
      setState({
        balanceLoading: !a ? false : true,
      });
      // get balance here
      const userId = state.user.userTelegramID;
      try {
        const res = await axios.post(`${BOT_API_URL}/v1/balance/`, {
          userAddress: state.user.patchwallet,
          contractAddress: "0xe36BD65609c08Cd17b53520293523CF4560533d0",
          chainId: "matic",
        });
        if (res?.data?.balanceEther) {
          const date = new Date().toISOString();
          setState({
            balance: parseFloat(res.data.balanceEther),
            balanceCached: false,
            balanceLoading: false,
            balanceUpdated: date,
          });
          localStorage.setItem(
            `grindery_${userId}_balance`,
            res.data.balanceEther
          );
          localStorage.setItem(`grindery_${userId}_balance_updated`, date);
        } else {
          setState({ balance: 0, balanceCached: false, balanceLoading: false });
          localStorage.setItem(`grindery_${userId}_balance`, "0");
        }
      } catch (error) {
        setState({ balance: 0, balanceCached: false, balanceLoading: false });
        localStorage.setItem(`grindery_${userId}_balance`, "0");
      }
    },
    [state.user]
  );

  const getConfig = useCallback(async () => {
    if (!window.Telegram?.WebApp?.initData) {
      return;
    }
    try {
      const res = await axios.get(`${BOT_API_URL}/v1/config`, {
        headers: {
          Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
        },
      });
      setState({
        config: res.data?.config || [],
      });
      localStorage.setItem(
        "grindery_wallet_config",
        JSON.stringify(res.data?.config || [])
      );
    } catch (error) {
      console.error("getConfig error", error);
    }
  }, []);

  useEffect(() => {
    if (state.user?.telegramSession) {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "/telegram.js";
      document.head.appendChild(script);
    }
  }, [state.user?.telegramSession]);

  useEffect(() => {
    if (!state.user?._id && window.Telegram?.WebApp?.initDataUnsafe?.user) {
      setState({
        user: {
          _id: window.Telegram?.WebApp?.initDataUnsafe?.user?.id || "",
          userTelegramID:
            window.Telegram?.WebApp?.initDataUnsafe?.user?.id || "",
          userHandle:
            window.Telegram?.WebApp?.initDataUnsafe?.user?.username || "",
        },
      });
    }
  }, [state.user]);

  useEffect(() => {
    getMe();
  }, [getMe]);

  useEffect(() => {
    getConfig();
  }, [getConfig]);

  useEffect(() => {
    getBalance(true);
  }, [getBalance]);

  useEffect(() => {
    getTgActivity();
  }, [getTgActivity]);

  useEffect(() => {
    getTgRewards();
  }, [getTgRewards]);

  useEffect(() => {
    getTgContacts();
  }, [getTgContacts]);

  useEffect(() => {
    if (state.user?.userTelegramID && typeof state.balance === "undefined") {
      setState({
        balance: parseFloat(
          localStorage.getItem(
            `grindery_${state.user?.userTelegramID}_balance`
          ) || "0"
        ),
        balanceCached: true,
        balanceUpdated:
          localStorage.getItem(
            `grindery_${state.user?.userTelegramID}_balance_updated`
          ) || "",
      });
    }
  }, [state.user, state.balance]);

  useEffect(() => {
    if (state.devMode.enabled || state.devMode.features?.LEADERBOARD) {
      getStats();
    }
  }, [state.devMode.enabled, state.devMode.features, getStats]);

  const getPhotos = useCallback(async () => {
    if (
      !state.devMode.features?.CONTACT_PHOTOS ||
      !state.contacts ||
      state.contacts.length < 1 ||
      !state.user?.telegramSession ||
      !window.telegram
    ) {
      return;
    }

    const { TelegramClient } = window.telegram;
    const { StringSession } = window.telegram.sessions;
    const client = new TelegramClient(
      new StringSession(state.user?.telegramSession || ""),
      Number(process.env.REACT_APP_TELEGRAM_API_ID),
      process.env.REACT_APP_TELEGRAM_API_HASH || "",
      {
        connectionRetries: 5,
        maxConcurrentDownloads: 1,
      }
    );

    await client.connect();
    if (!client.connected) {
      return;
    }

    for (const contact of state.contacts.filter((c) => c.id && c.username)) {
      const cachedPhoto = localStorage.getItem(
        "gr_wallet_contact_photo_" + contact.id
      );
      if (cachedPhoto) {
        setPhotos((_photos) => ({
          ..._photos,
          [contact.id]: cachedPhoto,
        }));
        continue;
      }

      const photo = await client.downloadProfilePhoto(contact.username);

      if (!photo) {
        setPhotos((_photos) => ({
          ..._photos,
          [contact.id]: "null",
        }));
        continue;
      }

      const base64Photo = btoa(
        String.fromCharCode(...new Uint8Array(photo as Buffer))
      );

      if (!base64Photo) {
        setPhotos((_photos) => ({
          ..._photos,
          [contact.id]: "null",
        }));
        continue;
      }

      const base64PhotoUrl = `data:image/png;base64,${base64Photo}`;

      localStorage.setItem(
        "gr_wallet_contact_photo_" + contact.id,
        base64PhotoUrl || "null"
      );
      setPhotos((_photos) => ({
        ..._photos,
        [contact.id]: base64PhotoUrl || "null",
      }));
    }
    await client.disconnect();
  }, [
    state.devMode.features?.CONTACT_PHOTOS,
    state.contacts,
    state.user?.telegramSession,
  ]);

  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  if (window.origin.includes("localhost")) {
    console.log("state", state);
  }

  return (
    <AppContext.Provider
      value={{
        state,
        photos,
        setState,
        getBalance,
        getTgActivity,
        getTgRewards,
        getTgContacts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
