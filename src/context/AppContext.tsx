import axios from "axios";
import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { BOT_API_URL, STORAGE_KEYS } from "../constants";
import {
  TelegramUserActivity,
  TelegramUserContact,
  TelegramUserReward,
} from "../types/Telegram";
import { UserProps } from "../types/User";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../store";

type StateProps = {
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
  rewardsFilter: string;
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
    loading: false,
    error: "",
    sessionLoading: true,
    activeTab: "tokens",
    activity: JSON.parse(localStorage.getItem("gr_wallet_activity") || "[]"),
    contactsLoading: true,
    contactsFilters: [],
    rewardsFilter: "received",
    activityFilters: [],
    activityLoading: true,
    activityTotal: JSON.parse(
      localStorage.getItem("gr_wallet_activity") || "[]"
    ).length,
    activitySkip: 0,
    rewards: JSON.parse(localStorage.getItem("gr_wallet_rewards") || "[]"),
    rewardsLoading: true,
    bannerShown: true,
    communityFilters: [],
    config: localStorage.getItem("grindery_wallet_config")
      ? JSON.parse(localStorage.getItem("grindery_wallet_config") || "[]")
      : undefined,
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
  const dispatch = useAppDispatch();
  const {
    rewards: { find, filter },
    user,
    debug,
  } = useAppSelector(selectAppStore);
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
        dispatch(appStoreActions.setUser(res.data));
      }
    } catch (error) {
      dispatch(appStoreActions.setUser(null));
    }
  }, [dispatch]);

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
          recipientTgId: user?.userTelegramID,
        });
      }
      if (state.activityFilters.includes("sent")) {
        filters["$or"].push({
          senderTgId: user?.userTelegramID,
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
  }, [state.activityFind, user, state.activityFilters]);

  const getTgRewards = useCallback(async () => {
    if (!window.Telegram?.WebApp?.initData) {
      return;
    }
    dispatch(
      appStoreActions.setRewards({
        loading: true,
      })
    );
    try {
      const res = await axios.get(
        `${BOT_API_URL}/v2/rewards/${
          filter || "received"
        }?limit=15&find=${JSON.stringify(find || [])}`,
        {
          headers: {
            Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
          },
        }
      );
      dispatch(
        appStoreActions.setRewards({
          docs: res.data?.docs || [],
          total: res.data?.total || 0,
        })
      );
      if (!filter || filter === "received") {
        localStorage.setItem(
          STORAGE_KEYS.REWARDS,
          JSON.stringify(res.data?.docs)
        );
        localStorage.setItem(STORAGE_KEYS.REWARDS_SAVED, new Date().toString());
      }
    } catch (error) {
      console.error("getTgRewards error", error);
    }
    dispatch(
      appStoreActions.setRewards({
        loading: false,
      })
    );
  }, [find, filter, dispatch]);

  const getTgContacts = useCallback(async () => {
    if (!window.Telegram?.WebApp?.initData || !user?.telegramSession) {
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
      dispatch(
        appStoreActions.setUser(
          user?._id
            ? ({
                ...user,
                telegramSession: "",
              } as UserProps)
            : null
        )
      );
      setState({
        contacts: [],
      });
    }
    setState({
      contactsLoading: false,
    });
  }, [user, dispatch]);

  const getBalance = useCallback(
    async (a?: boolean) => {
      if (!user?.patchwallet) {
        return;
      }
      setState({
        balanceLoading: !a ? false : true,
      });
      // get balance here
      const userId = user.userTelegramID;
      try {
        const res = await axios.post(`${BOT_API_URL}/v1/balance/`, {
          userAddress: user.patchwallet,
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
    [user]
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
    if (user?.telegramSession) {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "/telegram.js";
      document.head.appendChild(script);
    }
  }, [user?.telegramSession]);

  useEffect(() => {
    if (!user?._id && window.Telegram?.WebApp?.initDataUnsafe?.user) {
      dispatch(
        appStoreActions.setUser({
          _id: window.Telegram?.WebApp?.initDataUnsafe?.user?.id || "",
          userTelegramID:
            window.Telegram?.WebApp?.initDataUnsafe?.user?.id || "",
          userHandle:
            window.Telegram?.WebApp?.initDataUnsafe?.user?.username || "",
        })
      );
    }
  }, [user, dispatch]);

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
    if (user?.userTelegramID && typeof state.balance === "undefined") {
      setState({
        balance: parseFloat(
          localStorage.getItem(`grindery_${user?.userTelegramID}_balance`) ||
            "0"
        ),
        balanceCached: true,
        balanceUpdated:
          localStorage.getItem(
            `grindery_${user?.userTelegramID}_balance_updated`
          ) || "",
      });
    }
  }, [user, state.balance]);

  useEffect(() => {
    if (debug.enabled || debug.features?.LEADERBOARD) {
      getStats();
    }
  }, [debug.enabled, debug.features, getStats]);

  const getPhotos = useCallback(async () => {
    if (
      !debug.features?.CONTACT_PHOTOS ||
      !state.contacts ||
      state.contacts.length < 1 ||
      !user?.telegramSession ||
      !window.telegram
    ) {
      return;
    }

    const { TelegramClient } = window.telegram;
    const { StringSession } = window.telegram.sessions;
    const client = new TelegramClient(
      new StringSession(user?.telegramSession || ""),
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
  }, [debug.features?.CONTACT_PHOTOS, state.contacts, user?.telegramSession]);

  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  useEffect(() => {
    if (debug.enabled && debug.features?.CONTACT_PHOTOS) {
      const ws = new WebSocket("wss://ws.postman-echo.com/raw");
      ws.onopen = (event) => {
        console.log("WebSocket Client Connected");
        ws.send(JSON.stringify(event));
      };
    }
  }, [debug.features?.CONTACT_PHOTOS, debug.enabled]);

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
