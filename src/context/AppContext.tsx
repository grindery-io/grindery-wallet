import axios from "axios";
import React, { createContext, useCallback, useEffect, useReducer, useState } from "react";
import { BOT_API_URL } from "../constants";

export type UserProps = {
  _id: string;
  patchwallet?: string;
}

type StateProps = {
  user: UserProps | null;
  
}

// Context props
type ContextProps = {
  state: StateProps
};

// Context provider props
type AppContextProps = {
  children: React.ReactNode;
};

const defaultContext = {
  state: {
    user: null
  }
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
    const res = await axios
      .get(`${BOT_API_URL}/v1/telegram/me?id=${window.Telegram?.WebApp?.initDataUnsafe?.user?.id || ""}`, { headers: {
        'Authorization': `Bearer ${window.Telegram?.WebApp?.initData || ""}`
      } })
      if(res?.data?.user?._id){
        setState({
          user: res.data.user
        })
      }
    } catch(error){
      setState({
        user: null
      })
    }
}, [])


  useEffect(() => {
    getMe();
  }, [getMe]);

  console.log('app state', state);
  

  return (
    <AppContext.Provider
      value={{
        state
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
