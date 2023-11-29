import axios from "axios";
import { WALLET_API_URL } from "../constants";

export type GetMeResponseType = {
  _id: string;
  userTelegramID: string;
  userName: string;
  userHandle: string;
  responsePath: string;
  patchwallet: string;
  dateAdded: string;
  webAppOpened?: number;
  webAppOpenedFirstDate?: string;
  webAppOpenedLastDate?: string;
  isBanned?: string;
  telegramSession?: string;
  telegramSessionSavedDate?: string;
  phoneNumber?: string;
};

export const getMeRequest = async () => {
  return await axios.get(`${WALLET_API_URL}/v2/me`, {
    headers: {
      Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
    },
  });
};

export const updateMeRequest = async (body: { [key: string]: any }) => {
  return await axios.post(`${WALLET_API_URL}/v2/me`, body, {
    headers: {
      Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
    },
  });
};
