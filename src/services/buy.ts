import axios from "axios";
import { WALLET_API_URL } from "../constants";

export type GetMoonpaySignatureResponse = {
  signature: string;
};

export const getMoonpaySignatureRequest = async (url: string) => {
  return await axios.get<GetMoonpaySignatureResponse>(
    `${WALLET_API_URL}/v2/buy/sign-url?url=${encodeURIComponent(url)}`,
    {
      headers: {
        Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
      },
    }
  );
};
