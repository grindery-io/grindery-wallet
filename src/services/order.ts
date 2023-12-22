import axios from "axios";
import { WALLET_API_URL } from "../constants";

export type GetOrderQuoteResponseType = {
  from_usd_investment: number;
  from_g1_holding: number;
  from_mvu: number;
  from_time: number;
  equivalent_usd_invested: number;
  before_mvu: number;
  mvu_effect: number;
  time_effect: number;
  equivalent_gx_usd_exchange_rate: number;
  standard_gx_usd_exchange_rate: number;
  discount_received: number;
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
