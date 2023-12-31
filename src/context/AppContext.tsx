import React, { createContext, useCallback, useEffect, useState } from "react";
import {
  getMeRequest,
  getContactsRequest,
  getFullBalanceRequest,
  getSocialContactsRequest,
  updateMeRequest,
  getOrders,
  getOrderStatus,
} from "services";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";
import {
  extractTokensFromBalanceResponse,
  extractContactsFromContactsResponse,
  fixTokens,
} from "utils";
import { UserProps } from "types";
import { CHAINS, STORAGE_KEYS } from "../constants";

// Context props
type ContextProps = {
  photos?: { [key: string]: string };
};

// Context provider props
type AppContextProps = {
  children: React.ReactNode;
};

// Init context
export const AppContext = createContext<ContextProps>({});

export const AppContextProvider = ({ children }: AppContextProps) => {
  const dispatch = useAppDispatch();
  const { user, debug, contacts, tokens, balance } =
    useAppSelector(selectAppStore);
  const [photos, setPhotos] = useState<{ [key: string]: string }>({});

  const getMe = useCallback(async () => {
    try {
      const res = await getMeRequest();
      dispatch(appStoreActions.setUser(res?.data || null));
    } catch (error) {
      dispatch(appStoreActions.setUser(null));
      dispatch(
        appStoreActions.setError({
          type: "auth",
          message: "You are not logged in.",
          code: 401,
        })
      );
    }
  }, [dispatch]);

  const getTgContacts = useCallback(async () => {
    if (!window.Telegram?.WebApp?.initData || !user?.telegramSession) {
      dispatch(
        appStoreActions.setContacts({
          loading: false,
          items: [],
        })
      );
      return;
    }
    dispatch(
      appStoreActions.setContacts({
        loading: true,
      })
    );

    try {
      const res = await getContactsRequest();
      dispatch(
        appStoreActions.setContacts({
          items: extractContactsFromContactsResponse(res?.data || []),
        })
      );
      localStorage.setItem(
        STORAGE_KEYS.CONTACTS,
        JSON.stringify(extractContactsFromContactsResponse(res?.data || []))
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
      dispatch(
        appStoreActions.setContacts({
          items: [],
        })
      );
    }
    dispatch(
      appStoreActions.setContacts({
        loading: false,
      })
    );
  }, [user, dispatch]);

  useEffect(() => {
    if (user?.telegramSession) {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "/telegram.js";
      document.head.appendChild(script);
    }
  }, [user?.telegramSession]);

  useEffect(() => {
    getMe();
  }, [getMe]);

  useEffect(() => {
    getTgContacts();
  }, [getTgContacts]);

  const getPhotos = useCallback(async () => {
    if (
      !debug.features?.CONTACT_PHOTOS ||
      (contacts?.items || []).length < 1 ||
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

    for (const contact of (contacts?.items || []).filter(
      (c) => c.id && c.username
    )) {
      const cachedPhoto = localStorage.getItem(
        STORAGE_KEYS.CONTACT_PHOTO.replace("{{id}}", contact.id)
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
        STORAGE_KEYS.CONTACT_PHOTO.replace("{{id}}", contact.id),
        base64PhotoUrl || "null"
      );
      setPhotos((_photos) => ({
        ..._photos,
        [contact.id]: base64PhotoUrl || "null",
      }));
    }
    await client.destroy();
  }, [debug.features?.CONTACT_PHOTOS, contacts?.items, user?.telegramSession]);

  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  useEffect(() => {
    const controller = new AbortController();
    if (balance.shouldUpdate && user?.patchwallet) {
      dispatch(
        appStoreActions.setBalance({
          loading: true,
        })
      );
      getFullBalanceRequest(
        (debug.enabled && debug.features?.MULTICHAIN) || user?.optin_bridge
          ? CHAINS.map((chain) => chain.name).join(",")
          : "polygon",
        controller
      )
        .then((res) => {
          const removedTokens = JSON.parse(
            localStorage.getItem(STORAGE_KEYS.REMOVED_TOKENS) || "[]"
          );
          const tokens = (
            res.data ? extractTokensFromBalanceResponse(res.data) : []
          )
            .map(fixTokens)
            .filter(
              (token) =>
                !removedTokens.includes(`${token.chain}:${token.address}`)
            );

          dispatch(appStoreActions.updateTokens(tokens));
          dispatch(
            appStoreActions.setBalance({
              loading: false,
              value: parseFloat(res.data?.totalBalanceUsd || "0") || 0,
              updated: new Date().toISOString(),
              shouldUpdate: false,
            })
          );
        })
        .catch((error) => {
          dispatch(
            appStoreActions.setBalance({
              loading: false,
              shouldUpdate: false,
            })
          );
        });
    }

    return () => {
      controller.abort();
    };
  }, [
    user?.optin_bridge,
    user?.patchwallet,
    balance.shouldUpdate,
    debug,
    dispatch,
  ]);

  useEffect(() => {
    if (tokens && tokens.length > 0) {
      localStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(tokens));
    }
  }, [tokens]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BALANCE, JSON.stringify(balance));
  }, [balance]);

  useEffect(() => {
    const controller = new AbortController();
    if (window.Telegram?.WebApp?.initData) {
      dispatch(
        appStoreActions.setContacts({
          socialLoading: true,
        })
      );
      getSocialContactsRequest(controller)
        .then((res) => {
          dispatch(
            appStoreActions.setContacts({
              social: res.data || [],
              socialLoading: false,
            })
          );
          localStorage.setItem(
            STORAGE_KEYS.SOCIAL_CONTACTS,
            JSON.stringify(res.data || [])
          );
        })
        .catch((error) => {
          console.error("getSocialContactsRequest error", error);
          dispatch(
            appStoreActions.setContacts({
              socialLoading: false,
            })
          );
        });
    }

    return () => {
      controller.abort();
    };
  }, [debug, dispatch]);

  useEffect(() => {
    if (user?.patchwallet) {
      updateMeRequest({
        debug,
      })
        .then((res) => {
          //
        })
        .catch((error) => {
          // console.error("updateMeRequest error", error);
        });
    }
  }, [user?.patchwallet, debug]);

  useEffect(() => {
    const controller = new AbortController();
    if (user?.patchwallet && debug.features?.GX_PREORDER) {
      getOrders(controller)
        .then((res) => {
          const orderId = res.data?.[0]?.orderId;
          if (orderId) {
            getOrderStatus(orderId, controller)
              .then((order) => {
                dispatch(appStoreActions.setOrder(order.data || null));
              })
              .catch((err) => {
                dispatch(appStoreActions.setOrder(null));
              });
          } else {
            dispatch(appStoreActions.setOrder(null));
          }
        })
        .catch((err) => {
          dispatch(appStoreActions.setOrder(null));
        });
    }

    return () => {
      controller.abort();
    };
  }, [user?.patchwallet, debug.features?.GX_PREORDER, dispatch]);

  return (
    <AppContext.Provider
      value={{
        photos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
