import axios from "axios";
import { WALLET_API_URL } from "../constants";

export const sendTokensRequest = async (
  recipientTgId: string | string[],
  amount: string,
  message?: string,
  recipientHandle?: string | string[],
  recipientName?: string | string[],
  withConfirmation?: boolean
) => {
  const body: any = {
    recipientTgId,
    amount,
  };
  if (message) body.message = message;
  if (recipientHandle) body.recipientHandle = recipientHandle;
  if (recipientName) body.recipientName = recipientName;
  if (withConfirmation) body.withConfirmation = withConfirmation;
  return await axios.post(`${WALLET_API_URL}/v2/send`, body, {
    headers: {
      Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
    },
  });
};
