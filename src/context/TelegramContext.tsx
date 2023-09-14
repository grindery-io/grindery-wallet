import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";
import { CircularProgress } from "grindery-ui";
import { useGrinderyLogin } from "use-grindery-login";
import { BOT_API_URL, WORKFLOW_ENGINE_URL } from "../constants";


export type TelegramAuthUserInput = {
  phone: string;
  password: string;
  code: string;
};

export type UserProps = {
  telegram_session: string;
  email: string;
  patchwallet_telegram: string;
};

type StateProps = {
  loading: boolean;
  input: TelegramAuthUserInput;
  error: string;
  user: UserProps;
  sessionLoading: boolean;
  operationId: string;
  contacts: any[];
};

type ContextProps = {
  state: StateProps;
  handleInputChange: (name: string, value: string) => void;
  submitPhoneAndPassword: () => void;
  submitPhoneCode: () => void;
};

type TelegramContextProps = {
  children: React.ReactNode;
};

const defaultContext = {
  state: {
    loading: false,
    input: {
      phone: "",
      password: "",
      code: "",
    },
    error: "",
    user: {
      telegram_session: "",
      email: "",
      patchwallet_telegram: "",
    },
    sessionLoading: true,
    operationId: "",
    contacts: [],
  },
  handleInputChange: () => {},
  submitPhoneAndPassword: () => {},
  submitPhoneCode: () => {},
};

export const TelegramContext = createContext<ContextProps>(defaultContext);

export const TelegramContextProvider = ({ children }: TelegramContextProps) => {
  const { token } = useGrinderyLogin();
  const [state, setState] = useReducer(
    (state: StateProps, newState: Partial<StateProps>) => ({
      ...state,
      ...newState,
    }),
    {
      ...defaultContext.state,
    }
  );

  const getUser = useCallback(async () => {
    if (!token?.access_token) {
      return;
    }
    try {
      console.log("getUser fired");
      const response = await axios.post(
        WORKFLOW_ENGINE_URL,
        {
          jsonrpc: "2.0",
          method: "or_getUserProps",
          id: new Date(),
          params: {
            props: ["email", "telegram_session", "patchwallet_telegram"],
          },
        },
        {
          headers: {
            Authorization: "Bearer " + token?.access_token,
          },
        }
      );

      setState({
        user: {
          telegram_session: response.data?.result?.telegram_session || "",
          email: response.data?.result?.email || "",
          patchwallet_telegram:
            response.data?.result?.patchwallet_telegram || "",
        },
        sessionLoading: Boolean(response.data?.result?.telegram_session),
      });
    } catch (error: any) {
      console.error(
        "checkTelegramSession error",
        JSON.stringify(error, null, 2)
      );

      setState({
        error: error?.response?.data?.error?.message || "Something went wrong",
      });
    }
  }, [token?.access_token]);

  const checkTgSession = useCallback(async () => {
    if (
      !token?.access_token ||
      !state.user.telegram_session ||
      !state.sessionLoading
    ) {
      return;
    }
    try {
      console.log("checkTgSession fired");
      const res = await axios.get(
        `${BOT_API_URL}/v1/telegram/status?session=${encodeURIComponent(
          state.user.telegram_session
        )}`,
        {
          headers: {
            Authorization: "Bearer " + token?.access_token,
          },
        }
      );
      setState({
        user: {
          ...state.user,
          telegram_session: res.data?.status ? state.user.telegram_session : "",
        },
      });
    } catch (error) {
      console.log("checkTgSession error", error);
      setState({
        user: {
          ...state.user,
          telegram_session: "",
        },
      });
    }
    setState({
      sessionLoading: false,
    });
  }, [token?.access_token, state.user, state.sessionLoading]);

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
            Authorization: "Bearer " + token?.access_token,
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
            Authorization: "Bearer " + token?.access_token,
          },
        }
      );
      setState({
        user: {
          ...state.user,
          telegram_session: res.data?.session || "",
        },
      });
    } catch (error: any) {
      setState({
        operationId: "",
        user: {
          ...state.user,
          telegram_session: "",
        },
        error: error?.response?.data?.error?.message || "Something went wrong",
      });
    }
    setState({
      loading: false,
    });
  }, [state, token?.access_token]);

  const saveTgSession = useCallback(async () => {
    if (
      !state.user.email ||
      !state.user.telegram_session ||
      !token?.access_token ||
      state.sessionLoading
    ) {
      return;
    }
    try {
      console.log("saveTgSession fired");
      await axios.post(
        WORKFLOW_ENGINE_URL,
        {
          jsonrpc: "2.0",
          method: "or_updateUserProps",
          id: new Date(),
          params: {
            props: {
              email: state.user.email,
              telegram_session: state.user.telegram_session,
            },
          },
        },
        {
          headers: {
            Authorization: "Bearer " + token?.access_token,
          },
        }
      );
    } catch (error) {
      // console.log("saveTgSession error", error);
    }
  }, [
    state.user.email,
    state.user.telegram_session,
    token?.access_token,
    state.sessionLoading,
  ]);

  const getTgContacts = useCallback(async () => {
    if (
      !state.user.telegram_session ||
      !token?.access_token ||
      state.sessionLoading
    ) {
      return;
    }
    try {
      console.log("getTgContacts fired");
      const res = await axios.get(
        `${BOT_API_URL}/v1/telegram/contacts?session=${encodeURIComponent(
          state.user.telegram_session
        )}`,
        {
          headers: {
            Authorization: "Bearer " + token?.access_token,
          },
        }
      );
      setState({
        contacts: res.data || [],
      });
    } catch (error) {
      console.log("getTgContacts error", error);
    }
  }, [state.user.telegram_session, token?.access_token, state.sessionLoading]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    checkTgSession();
  }, [checkTgSession]);

  useEffect(() => {
    saveTgSession();
  }, [saveTgSession]);

  useEffect(() => {
    getTgContacts();
  }, [getTgContacts]);

  console.log("telegram state", state);

  return token?.access_token ? (
    <TelegramContext.Provider
      value={{
        state,
        handleInputChange,
        submitPhoneAndPassword,
        submitPhoneCode,
      }}
    >
      {state.sessionLoading ? (
        <div style={{ textAlign: "center", margin: "80px auto" }}>
          <CircularProgress />
        </div>
      ) : (
        children
      )}
    </TelegramContext.Provider>
  ) : null;
};

export default TelegramContextProvider;
