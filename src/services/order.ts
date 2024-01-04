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
  quoteId: string;
  tokenAmountG1: string;
  usdFromUsdInvestment: string;
  usdFromG1Investment: string;
  usdFromMvu: string;
  usdFromTime: string;
  equivalentUsdInvested: string;
  gxBeforeMvu: string;
  gxMvuEffect: string;
  gxTimeEffect: string;
  GxUsdExchangeRate: string;
  standardGxUsdExchangeRate: string;
  discountReceived: string;
  gxReceived: string;
  userTelegramID: string;
  status: OrderStatusType;
  transactionHash_G1?: string;
  userOpHash_G1?: string;
};

export type GetOrderQuoteResponseType = {
  usdFromUsdInvestment: string;
  usdFromG1Investment: string;
  usdFromMvu: string;
  usdFromTime: string;
  equivalentUsdInvested: string;
  gxBeforeMvu: string;
  gxMvuEffect: string;
  gxTimeEffect: string;
  gxReceived: string;
  GxUsdExchangeRate: string;
  standardGxUsdExchangeRate: string;
  discountReceived: string;
  date: string;
  quoteId: string;
  userTelegramID: string;
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

export type GetOrderStatusResponseType = OrderResponseType;

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
  order?: {
    orderId: string;
    dateG1: string;
    status: OrderStatusType;
    transactionHashG1?: string;
    userOpHashG1?: string;
    quote?: GetOrderQuoteResponseType;
  };
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
