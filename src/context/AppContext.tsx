import axios from "axios";
import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { BOT_API_URL, EXPERIMENTAL_FEATURES } from "../constants";
import {
  TelegramAuthUserInput,
  TelegramUserActivity,
  TelegramUserContact,
  TelegramUserReward,
} from "../types/Telegram";
import { UserProps } from "../types/User";

type StateProps = {
  user: UserProps | null;
  loading: boolean;
  input: TelegramAuthUserInput;
  error: string;
  operationId: string;
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
  rewards: {
    received: TelegramUserReward[];
    pending: TelegramUserActivity[];
  };
  rewardsLoading: boolean;
  telegramSessionSaved?: boolean;
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
  handleInputChange: (name: string, value: string) => void;
  submitPhoneAndPassword: () => void;
  submitPhoneCode: () => void;
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
    input: {
      phone: "",
      password: "",
      code: "",
    },
    error: "",
    sessionLoading: true,
    operationId: "",
    activeTab: "tokens",
    activity: localStorage.getItem("gr_wallet_activity")
      ? JSON.parse(localStorage.getItem("gr_wallet_activity") || "[]")
      : [],
    contactsLoading: true,
    contactsFilters: [],
    rewardsFilters: [],
    activityFilters: [],
    activityLoading: true,
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
  handleInputChange: () => {},
  submitPhoneAndPassword: () => {},
  submitPhoneCode: () => {},
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

  const handleInputChange = useCallback(
    (name: string, value: string) => {
      setState({
        error: "",
        input: {
          ...state.input,
          [name]: value,
        },
      });
    },
    [state.input]
  );

  const submitPhoneAndPassword = useCallback(async () => {
    if (!state.input.phone) {
      setState({
        error: "Phone number is required",
      });
      return;
    }
    if (!state.input.password) {
      setState({
        error: "Password is required",
      });
      return;
    }
    setState({
      error: "",
      loading: true,
    });
    try {
      const res = await axios.post(
        `${BOT_API_URL}/v1/init`,
        {
          phone: state.input.phone,
          password: state.input.password,
        },
        {
          headers: {
            Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
          },
        }
      );
      setState({
        operationId: res.data?.operationId || "",
      });
    } catch (error: any) {
      setState({
        operationId: "",
        error: error?.response?.data?.error?.message || "Something went wrong",
      });
    }
    setState({
      loading: false,
    });
  }, [state]);

  const submitPhoneCode = useCallback(async () => {
    if (!state.input.code) {
      setState({
        error: "Phone code is required",
      });
      return;
    }
    setState({
      error: "",
      loading: true,
    });
    try {
      const res = await axios.post(
        `${BOT_API_URL}/v1/callback`,
        {
          operationId: state.operationId,
          code: state.input.code,
        },
        {
          headers: {
            Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
          },
        }
      );
      setState({
        // @ts-ignore
        user: {
          ...state.user,
          telegramSession: res.data?.session || "",
        },
        telegramSessionSaved: true,
      });
    } catch (error: any) {
      setState({
        operationId: "",
        // @ts-ignore
        user: {
          ...state.user,
          telegramSession: "",
        },
        error: error?.response?.data?.error?.message || "Something went wrong",
      });
    }
    setState({
      loading: false,
    });
  }, [state]);

  const getTgActivity = useCallback(async () => {
    if (!window.Telegram?.WebApp?.initData) {
      return;
    }
    setState({
      activityLoading: true,
    });
    try {
      const res = await axios.get(`${BOT_API_URL}/v1/activity`, {
        headers: {
          Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
        },
      });
      setState({
        activity: (res.data || []).sort(
          (a: TelegramUserActivity, b: TelegramUserActivity) =>
            Date.parse(b.dateAdded) - Date.parse(a.dateAdded)
        ),
      });
      localStorage.setItem(
        `gr_wallet_activity`,
        JSON.stringify(
          (res.data || []).sort(
            (a: TelegramUserActivity, b: TelegramUserActivity) =>
              Date.parse(b.dateAdded) - Date.parse(a.dateAdded)
          )
        )
      );
    } catch (error) {
      console.error("getTgActivity error", error);
    }
    setState({
      activityLoading: false,
    });
  }, []);

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
    if (state.devMode.enabled) {
      getStats();
    }
  }, [state.devMode.enabled, getStats]);

  const abortControllerRef = useRef<AbortController>(new AbortController());

  const getPhotos = useCallback(async () => {
    if (
      !state.devMode.features?.CONTACT_PHOTOS ||
      !state.contacts ||
      state.contacts.length < 1
    ) {
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

      const res = await axios.get(
        `${BOT_API_URL}/v1/user/photo?username=${contact?.username}`,
        {
          signal: abortControllerRef.current.signal,
          headers: {
            Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
          },
        }
      );
      localStorage.setItem(
        "gr_wallet_contact_photo_" + contact.id,
        res.data.photo || "null"
      );
      setPhotos((_photos) => ({
        ..._photos,
        [contact.id]: res.data.photo || "null",
      }));
    }
  }, [state.contacts, state.devMode.features?.CONTACT_PHOTOS]);

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
        handleInputChange,
        submitPhoneAndPassword,
        submitPhoneCode,
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
