import axios from "axios";
import { WALLET_API_URL } from "../constants";

export type GetOrderQuoteResponseType = {
  usd_from_usd_investment: number;
  usd_from_g1_holding: number;
  usd_from_mvu: number;
  usd_from_time: number;
  equivalent_usd_invested: number;
  gx_before_mvu: number;
  gx_mvu_effect: number;
  gx_time_effect: number;
  equivalent_gx_usd_exchange_rate: number;
  standard_gx_usd_exchange_rate: number;
  discount_received: number;
  gx_received: string;
};

export const getOrderQuote = async (
  convert: string,
  add: string,
  controller?: AbortController
) => {
  return await axios.get<GetOrderQuoteResponseType>(
    `${WALLET_API_URL}/v2/order/quote?convert=${convert}&add=${add}`,
    {
      signal: controller?.signal,
      headers: {
        Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
      },
    }
  );
};
