import axios from "axios";
import { WALLET_API_URL } from "../constants";

export enum OrderStatusType {
  PENDING = "pending",
  COMPLETE = "complete",
  FAILURE_G1 = "failure_G1",
  FAILURE_USD = "failure_USD",
  WAITING_USD = "waiting_usd",
  PENDING_USD = "pending_usd",
}

export type OrderResponseType = {
  orderId: string;
  date?: string;
  status: OrderStatusType;
  userTelegramID: string;
  tokenAmount_G1: string;
  transactionHash_G1?: string;
  userOpHash_G1?: string;
};

export type GetOrderQuoteResponseType = {
  quoteId: string;
  userTelegramID: string;
  date: string;
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
  order: {
    orderId: string;
    status: OrderStatusType;
    quoteId: string;
    tokenAmount_G1: string;
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
    userTelegramID: string;
  };
  quote: GetOrderQuoteResponseType;
};

export const getOrderStatus = async (
  orderId: string,
  controller?: AbortController
) => {
  return await axios.get<GetOrderStatusResponseType>(
    `${WALLET_API_URL}/v2/order/${orderId}`,
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
  order?: OrderResponseType;
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

export type GetOrdersResponseType = OrderResponseType[];

export const getOrders = async (controller?: AbortController) => {
  return await axios.get<GetOrdersResponseType>(
    `${WALLET_API_URL}/v2/order/list`,
    {
      signal: controller?.signal,
      headers: {
        Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
      },
    }
  );
};

export type PayOrderResponseType = {
  success: boolean;
  order?: OrderResponseType;
};

export const payOrder = async (
  body: {
    orderId: string;
    tokenAddress: string;
    chainId: string;
  },
  controller?: AbortController
) => {
  return await axios.patch<PayOrderResponseType>(
    `${WALLET_API_URL}/v2/order`,
    body,
    {
      signal: controller?.signal,
      headers: {
        Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
      },
    }
  );
};
