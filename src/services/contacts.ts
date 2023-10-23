import axios from "axios";
import { BOT_API_URL } from "../constants";

export const getContactsRequest = async () => {
  return await axios.get(`${BOT_API_URL}/v2/contacts`, {
    headers: {
      Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
    },
  });
};
