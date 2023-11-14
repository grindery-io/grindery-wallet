import axios from "axios";
import { WALLET_API_URL } from "../constants";

export type GetBalanceResponseType = {
  balanceWei: string;
  balanceEther: string;
};

export const getBalanceRequest = async (
  address: string,
  tokenAddress?: string,
  chainId?: string,
  controller?: AbortController
) => {
  return await axios.post<GetBalanceResponseType>(
    `${WALLET_API_URL}/v2/balance/`,
    {
      userAddress: address,
      contractAddress:
        tokenAddress || "0xe36BD65609c08Cd17b53520293523CF4560533d0",
      chainId: chainId || "matic",
    },
    {
      signal: controller?.signal,
    }
  );
};

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

export const getFullBalanceRequest = async (controller?: AbortController) => {
  return await axios.get<GetFullBalanceResponseType>(
    `${WALLET_API_URL}/v2/balance/`,
    {
      signal: controller?.signal,
      headers: {
        Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
      },
    }
  );
};
