import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import useAppContext from "./useAppContext";
import { TelegramUser, TelegramUserContact } from "../types/Telegram";
import { BOT_API_URL } from "../constants";
import { getUserName } from "../utils/getUserName";

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
    state: { contacts },
  } = useAppContext();
  const cachedUser = localStorage.getItem(`gr_wallet_app_user_${userId}`);

  const [user, setUser] = useState<TelegramUserContact | TelegramUser | null>(
    contacts?.find((c) => c.id === userId)
      ? contacts?.find((c) => c.id === userId)
      : cachedUser
      ? JSON.parse(cachedUser || "")
      : null
  );

  const [avatar, setAvatar] = useState(
    localStorage.getItem("gr_wallet_contact_photo_" + userId) || ""
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

  const getUser = useCallback(async () => {
    if (!userId) return;
    if (user) return;

    try {
      const res = await axios.get(
        `${BOT_API_URL}/v1/telegram/user?id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
          },
        }
      );

      if (res.data._id) {
        setUser(res.data);
        localStorage.setItem(
          `gr_wallet_app_user_${userId}`,
          JSON.stringify(res.data)
        );
      }
    } catch (err) {
      //
    }
  }, [userId, user]);

  const getAvatar = useCallback(async () => {
    if (
      avatar ||
      !user ||
      !(user as TelegramUserContact)?.username ||
      !(user as TelegramUser)?.userName
    ) {
      return;
    }

    try {
      const res = await axios.get(
        `${BOT_API_URL}/v1/telegram/user/photo?username=${
          (user as TelegramUserContact)?.username ||
          (user as TelegramUser)?.userHandle
        }`,
        {
          headers: {
            Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
          },
        }
      );
      setAvatar(res.data.photo || "");

      localStorage.setItem(
        "gr_wallet_contact_photo_" + userId,
        res.data.photo || "null"
      );
    } catch (err) {
      setAvatar("");
    }
  }, [userId, user, avatar]);

  useEffect(() => {
    const contact = contacts?.find((c) => c.id === userId);
    if (contact) {
      setUser(contact);
    }
  }, [contacts, userId]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    getAvatar();
  }, [getAvatar]);

  return { user: appUser };
};

export default useAppUser;