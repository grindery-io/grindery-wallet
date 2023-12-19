import axios from "axios";
import { WALLET_API_URL } from "../constants";

export type GetFullBalanceResponseType = {
  totalBalanceUsd: string;
  totalCount: number;
  assets: {
    blockchain: string;
    tokenName: string;
    tokenSymbol: string;
    tokenDecimals: number;
    tokenType: string;
    contractAddress: string;
    holderAddress: string;
    balance: string;
    balanceRawInteger: string;
    balanceUsd: string;
    tokenPrice: string;
    thumbnail: string;
  }[];
  syncStatus: {
    timestamp: number;
    lag: string;
    status: string;
  };
};

export const getFullBalanceRequest = async (
  chain?: string,
  controller?: AbortController
) => {
  return await axios.get<GetFullBalanceResponseType>(
    `${WALLET_API_URL}/v2/balance/${chain ? "?chain=" + chain : ""}`,
    {
      signal: controller?.signal,
      headers: {
        Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
      },
    }
  );
};
