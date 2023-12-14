import axios from "axios";
import { WALLET_API_URL } from "../constants";

export type SearchTokensResponseType = {
  blockchain: string;
  address: string;
  name: string;
  decimals: number;
  symbol: string;
  thumbnail: string;
}[];

export const searchTokensRequest = async (
  chain?: string,
  controller?: AbortController
) => {
  return await axios.get<SearchTokensResponseType>(
    `${WALLET_API_URL}/v2/tokens?chain=${chain || "polygon"}`,
    {
      signal: controller?.signal,
      headers: {
        Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
      },
    }
  );
};

export type SearchSwapTokensResponseType = {
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  address: string;
  id: string;
  chainId: number;
}[];

export const searchSwapTokensRequest = async (
  chainId?: string,
  controller?: AbortController
) => {
  return await axios.get<SearchSwapTokensResponseType>(
    `https://shortcuts-backend-dynamic-int.herokuapp.com/api/v1/baseTokens?chainId=${
      chainId || "137"
    }`,
    {
      signal: controller?.signal,
    }
  );
};

export type GetTokensPriceResponseType = {
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: null;
  };
  data: {
    [symbol: string]: {
      id: number;
      name: string;
      symbol: string;
      slug: string;
      num_market_pairs: number;
      date_added: string;
      tags: {
        slug: string;
        name: string;
        category: string;
      }[];

      max_supply: number;
      circulating_supply: number;
      total_supply: number;
      is_active: number;
      infinite_supply: boolean;
      platform: null;
      cmc_rank: number;
      is_fiat: number;
      self_reported_circulating_supply: null;
      self_reported_market_cap: null;
      tvl_ratio: null;
      last_updated: string;
      quote: {
        USD: {
          price: number;
          volume_24h: number;
          volume_change_24h: number;
          percent_change_1h: number;
          percent_change_24h: number;
          percent_change_7d: number;
          percent_change_30d: number;
          percent_change_60d: number;
          percent_change_90d: number;
          market_cap: number;
          market_cap_dominance: number;
          fully_diluted_market_cap: number;
          tvl: null;
          last_updated: string;
        };
      };
    }[];
  };
};

export const getTokensPriceRequest = async (
  symbol?: string,
  controller?: AbortController
) => {
  return await axios.get<GetTokensPriceResponseType>(
    `${WALLET_API_URL}/v2/tokens/price?symbol=${symbol}`,
    {
      signal: controller?.signal,
      headers: {
        Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
      },
    }
  );
};
