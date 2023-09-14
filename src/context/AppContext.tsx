import axios from "axios";
import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { BOT_API_URL } from "../constants";

export type UserProps = {
  _id: string;
  userTelegramID?: string;
  userName?: string;
  userHandle?: string;
  responsePath?: string;
  patchwallet?: string;
  dateAdded?: string;
  telegramSession?: string;
};

export type TelegramAuthUserInput = {
  phone: string;
  password: string;
  code: string;
};

type StateProps = {
  user: UserProps | null;
  loading: boolean;
  input: TelegramAuthUserInput;
  error: string;
  operationId: string;
  contacts?: any[];
};

// Context props
type ContextProps = {
  state: StateProps;
  handleInputChange: (name: string, value: string) => void;
  submitPhoneAndPassword: () => void;
  submitPhoneCode: () => void;
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
  },
  handleInputChange: () => {},
  submitPhoneAndPassword: () => {},
  submitPhoneCode: () => {},
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
      console.log("getMe", res?.data);

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

  const getTgContacts = useCallback(async () => {
    if (!state.user?.telegramSession || !window.Telegram?.WebApp?.initData) {
      return;
    }
    try {
      const res = await axios.get(
        `${BOT_API_URL}/v1/telegram/contacts?session=${encodeURIComponent(
          state.user.telegramSession
        )}`,
        {
          headers: {
            Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
          },
        }
      );
      setState({
        contacts: res.data || [],
      });
    } catch (error) {
      console.log("getTgContacts error", error);
    }
  }, [state.user?.telegramSession]);

  useEffect(() => {
    getMe();
  }, [getMe]);

  useEffect(() => {
    getTgContacts();
  }, [getTgContacts]);

  console.log("app state", JSON.stringify(state, null, 2));
  console.log(
    "telegram",
    JSON.stringify(window.Telegram?.WebApp || {}, null, 2)
  );

  return (
    <AppContext.Provider
      value={{
        state,
        handleInputChange,
        submitPhoneAndPassword,
        submitPhoneCode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
