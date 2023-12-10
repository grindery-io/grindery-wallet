import axios from "axios";
import { WALLET_API_URL } from "../constants";

export type GetStakedAmountResponseType = {
  amount: string;
};

export const getStakedAmountRequest = async (controller?: AbortController) => {
  return await axios.get<GetStakedAmountResponseType>(
    `${WALLET_API_URL}/v2/stake/`,
    {
      signal: controller?.signal,
      headers: {
        Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
      },
    }
  );
};
