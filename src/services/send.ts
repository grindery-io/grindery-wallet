import axios from "axios";
import { WALLET_API_URL } from "../constants";

export type SendTokensResponseType = {
  success: boolean;
  messageId?: string;
  error?: string;
};

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
  return await axios.post<SendTokensResponseType>(
    `${WALLET_API_URL}/v2/send`,
    body,
    {
      headers: {
        Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
      },
    }
  );
};

export const sendTokensRequestV2 = async ({
  recipientTgId,
  amount,
  message,
  recipientHandle,
  recipientName,
  withConfirmation,
  chainId,
  tokenAddress,
}: {
  recipientTgId: string | string[];
  amount: string;
  message?: string;
  recipientHandle?: string | string[];
  recipientName?: string | string[];
  withConfirmation?: boolean;
  chainId?: string;
  tokenAddress?: string;
}) => {
  const body: any = {
    recipientTgId,
    amount,
  };
  if (message) body.message = message;
  if (recipientHandle) body.recipientHandle = recipientHandle;
  if (recipientName) body.recipientName = recipientName;
  if (withConfirmation) body.withConfirmation = withConfirmation;
  if (chainId) body.chainId = chainId;
  if (tokenAddress) body.tokenAddress = tokenAddress;
  return await axios.post<SendTokensResponseType>(
    `${WALLET_API_URL}/v2/send`,
    body,
    {
      headers: {
        Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
      },
    }
  );
};
