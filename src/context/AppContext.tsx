import axios from "axios";
import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { BOT_API_URL } from "../constants";
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
};

// Context props
type ContextProps = {
  state: StateProps;
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
    activity: [],
    contactsLoading: true,
    contactsFilters: [],
    rewardsFilters: [],
    activityFilters: [],
    activityLoading: true,
    rewards: {
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
      features: {
        sendMessage:
          localStorage.getItem("grindery_wallet_features_send_message") ===
          "true",
      },
    },
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
      const res = await axios.get(`${BOT_API_URL}/v1/telegram/me`, {
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
        `${BOT_API_URL}/v1/telegram/init`,
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
        `${BOT_API_URL}/v1/telegram/callback`,
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
      const res = await axios.get(`${BOT_API_URL}/v1/telegram/activity`, {
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
      const res = await axios.get(`${BOT_API_URL}/v1/telegram/rewards`, {
        headers: {
          Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
        },
      });
      setState({
        rewards: {
          pending: (res.data?.pending || []).sort(
            (a: TelegramUserActivity, b: TelegramUserActivity) =>
              Date.parse(b.dateAdded) - Date.parse(a.dateAdded)
          ),
          received: (res.data?.received || []).sort(
            (a: TelegramUserReward, b: TelegramUserReward) =>
              Date.parse(b.dateAdded) - Date.parse(a.dateAdded)
          ),
        },
      });
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
      const res = await axios.get(`${BOT_API_URL}/v1/telegram/contacts`, {
        headers: {
          Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
        },
      });
      setState({
        contacts: res.data || [],
      });
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
        const res = await axios.post(`${BOT_API_URL}/v1/data/balance/`, {
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
      const res = await axios.get(`${BOT_API_URL}/v1/telegram/config`, {
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

  if (window.origin.includes("localhost")) {
    console.log("state", state);
  }

  return (
    <AppContext.Provider
      value={{
        state,
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
