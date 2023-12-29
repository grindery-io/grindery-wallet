import axios from "axios";
import { WALLET_API_URL } from "../constants";
import { OrderDetailsStatus } from "types";

export type GetOrderQuoteResponseType = {
  quoteId: string;
  usd_from_usd_investment: string;
  usd_from_g1_holding: string;
  usd_from_mvu: string;
  usd_from_time: string;
  equivalent_usd_invested: string;
  gx_before_mvu: string;
  gx_mvu_effect: string;
  gx_time_effect: string;
  equivalent_gx_usd_exchange_rate: string;
  standard_gx_usd_exchange_rate: string;
  discount_received: string;
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

export type GetOrderStatusResponseType = {
  orderId: string;
  date: string;
  status: OrderDetailsStatus;
  userTelegramID: string;
  g1_amount: string;
  transactionHash?: string;
  userOpHash?: string;
};

export const getOrderStatus = async (controller?: AbortController) => {
  return await axios.get<GetOrderStatusResponseType>(
    `${WALLET_API_URL}/v2/order`,
    {
      signal: controller?.signal,
      headers: {
        Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
      },
    }
  );
};

export type SendOrderResponseType = {
  success: boolean;
  transactionHash: string;
};

export const sendOrder = async (
  quoteId: string,
  controller?: AbortController
) => {
  return await axios.post<SendOrderResponseType>(
    `${WALLET_API_URL}/v2/order`,
    {
      quoteId,
    },
    {
      signal: controller?.signal,
      headers: {
        Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
      },
    }
  );
};
