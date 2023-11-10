import React, { createContext, useCallback, useEffect, useState } from "react";
import { STORAGE_KEYS } from "../constants";
import { UserProps } from "../types/User";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../store";
import { getMeRequest } from "../services/me";
import { getContactsRequest } from "../services/contacts";
import { getFullBalanceRequest } from "../services/balance";

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
  const {
    user,
    debug,
    contacts,
    tokens: { items },
  } = useAppSelector(selectAppStore);
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
          items: res?.data || [],
        })
      );
      localStorage.setItem(
        STORAGE_KEYS.CONTACTS,
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
    if (!user?._id && window.Telegram?.WebApp?.initDataUnsafe?.user) {
      dispatch(
        appStoreActions.setUser({
          _id:
            window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || "",
          userTelegramID:
            window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || "",
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
    if (items && items.length > 0) {
      localStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(items));
    }
  }, [items]);

  useEffect(() => {
    const controller = new AbortController();
    if (user?.userTelegramID) {
      getFullBalanceRequest(controller)
        .then((res) => {
          console.log("balance", res.data);
        })
        .catch((error) => {
          //
        });
    }

    return () => {
      controller.abort();
    };
  }, [user?.userTelegramID]);

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
