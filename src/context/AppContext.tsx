import NexusClient from "grindery-nexus-client";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useGrinderyLogin } from "use-grindery-login";
import { defaultFunc } from "../helpers/utils";
import axios from "axios";
import { WORKFLOW_ENGINE_URL } from "../constants";

// Context props
type ContextProps = {
  user: string | null;
  disconnect: any;
  connect: any;
  client: NexusClient | null;
  isOptedIn: boolean;
  userEmail: string;
  userProps: any;
  checkingOptedIn: boolean;
  setIsOptedIn: (a: boolean) => void;
  setUserEmail: (a: string) => void;
  setUserProps: (a: any) => void;
};

// Context provider props
type AppContextProps = {
  children: React.ReactNode;
};

// Init context
export const AppContext = createContext<ContextProps>({
  user: null,
  disconnect: defaultFunc,
  connect: defaultFunc,
  client: null,
  isOptedIn: false,
  userEmail: "",
  userProps: {},
  checkingOptedIn: true,
  setIsOptedIn: () => {},
  setUserEmail: () => {},
  setUserProps: () => {},
});

export const AppContextProvider = ({ children }: AppContextProps) => {
  // Auth hook
  const { user, connect, disconnect, token: nexusToken } = useGrinderyLogin();

  const [isOptedIn, setIsOptedIn] = useState<boolean>(false);

  const [checkingOptedIn, setCheckingOptedIn] = useState<boolean>(true);

  // Nexus API client
  const [client, setClient] = useState<NexusClient | null>(null);

  const [userEmail, setUserEmail] = useState("");

  const [userProps, setUserProps] = useState<any>({});

  // Initialize user
  const initUser = useCallback(
    (userId: string | null, access_token: string) => {
      if (userId && access_token) {
        const nexus = new NexusClient();
        nexus.authenticate(access_token);
        setClient(nexus);
      }
    },
    []
  );

  const verifyUser = async () => {
    const res = await client?.isUserHasEmail().catch((err) => {
      console.error("isUserHasEmail error:", err.message);
    });
    if (res) {
      const props = await axios.post(
        WORKFLOW_ENGINE_URL,
        {
          jsonrpc: "2.0",
          method: "or_getUserProps",
          id: new Date(),
          params: {
            props: ["email", "patchwallet_telegram"],
          },
        },
        {
          headers: {
            Authorization: "Bearer " + nexusToken?.access_token,
          },
        }
      );
      setUserProps(props.data?.result || {});
      const optinRes = await client?.isAllowedUser().catch((err) => {
        console.error("isAllowedUser error:", err.message);
        setIsOptedIn(false);
      });
      if (optinRes) {
        setIsOptedIn(true);
      } else {
        setIsOptedIn(false);
      }
    }
    setCheckingOptedIn(false);
  };

  useEffect(() => {
    if (user && client) {
      verifyUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, client]);

  useEffect(() => {
    if (user) {
      initUser(user, nexusToken?.access_token || "");
    }
  }, [user, initUser, nexusToken]);

  return (
    <AppContext.Provider
      value={{
        user,
        disconnect,
        connect,
        client,
        isOptedIn,
        userEmail,
        checkingOptedIn,
        setIsOptedIn,
        setUserEmail,
        userProps,
        setUserProps,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
