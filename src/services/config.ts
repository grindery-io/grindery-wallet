import axios from "axios";
import { WALLET_API_URL } from "../constants";

export type GetConfigResponseType = {
  config: {
    id: string;
    createdTime: string;
    fields: {
      Category: string;
      Link: string;
      Status: string;
      Type: string;
      Description: string;
      Image: string;
      Title: string;
    };
  }[];
};

export const getConfigRequest = async () => {
  return await axios.get<GetConfigResponseType>(`${WALLET_API_URL}/v2/config`, {
    headers: {
      Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
    },
  });
};
