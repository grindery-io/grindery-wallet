import { useEffect, useState } from "react";
import axios from "axios";
import { TelegramUser, TelegramUserContact } from "../types/Telegram";
import { BOT_API_URL, STORAGE_KEYS } from "../constants";
import { getUserName } from "../utils/getUserName";
import { selectAppStore, useAppSelector } from "../store";

export type AppUser = {
  id: string;
  name: string;
  avatarText: string;
  isInvited: boolean;
  isGrinderyUser: boolean;
  isContact: boolean;
  username?: string;
  avatar?: string;
};

const useAppUser = (userId: string) => {
  const {
    contacts: { items: contacts },
    photos,
  } = useAppSelector(selectAppStore);
  const cachedUser = localStorage.getItem(
    STORAGE_KEYS.APP_USER.replace("{{id}}", userId)
  );

  const photo = photos?.[userId];

  const [user, setUser] = useState<TelegramUserContact | TelegramUser | null>(
    contacts?.find((c) => c.id === userId)
      ? contacts?.find((c) => c.id === userId)
      : cachedUser
      ? JSON.parse(cachedUser || "")
      : null
  );

  const [avatar, setAvatar] = useState(
    Boolean(
      localStorage.getItem(STORAGE_KEYS.CONTACT_PHOTO.replace("{{id}}", userId))
    ) &&
      localStorage.getItem(
        STORAGE_KEYS.CONTACT_PHOTO.replace("{{id}}", userId)
      ) !== "null"
      ? localStorage.getItem(
          STORAGE_KEYS.CONTACT_PHOTO.replace("{{id}}", userId)
        ) || ""
      : photo || ""
  );

  const appUser: AppUser = {
    id: userId,
    username:
      (user as TelegramUserContact)?.username ||
      (user as TelegramUser)?.userHandle ||
      "",
    name: getUserName(user),
    avatar: (user as TelegramUserContact)?.id ? avatar : "",
    avatarText: (getUserName(user)?.charAt(0) !== "@"
      ? getUserName(user)?.charAt(0)
      : getUserName(user)?.charAt(1)
    )?.toUpperCase(),
    isInvited: (user as TelegramUserContact)?.isInvited || false,
    isGrinderyUser:
      (user as TelegramUserContact)?.isGrinderyUser ||
      Boolean((user as TelegramUser)?.userTelegramID),
    isContact: Boolean((user as TelegramUserContact)?.id),
  };

  useEffect(() => {
    const contact = contacts?.find((c) => c.id === userId);
    if (contact) {
      setUser(contact);
    }
  }, [contacts, userId]);

  useEffect(() => {
    const controller = new AbortController();
    if (userId && !user) {
      axios
        .get(`${BOT_API_URL}/v1/user?id=${userId}`, {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
          },
        })
        .then((res) => {
          if (res.data._id) {
            setUser(res.data);
            localStorage.setItem(
              STORAGE_KEYS.APP_USER.replace("{{id}}", userId),
              JSON.stringify(res.data)
            );
          }
        })
        .catch((err) => {
          //
        });
    }

    return () => {
      controller.abort();
    };
  }, [userId, user]);

  useEffect(() => {
    if (photo) {
      setAvatar(photo);
    }
  }, [photo]);

  return { user: appUser };
};

export default useAppUser;
