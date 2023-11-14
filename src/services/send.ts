import axios from "axios";
import { WALLET_API_URL } from "../constants";

export const sendTokensRequest = async (
  recipientTgId: string | string[],
  amount: string,
  message?: string
) => {
  return await axios.post(
    `${WALLET_API_URL}/v2/send`,
    {
      recipientTgId,
      amount,
      message,
    },
    {
      headers: {
        Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
      },
    }
  );
};
