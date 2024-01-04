import axios from "axios";
import { WALLET_API_URL } from "../constants";
import { OrderStatus, OrderType } from "types";

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

export type GetOrderStatusResponseType = OrderType;

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
    status: OrderStatus;
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

export type GetOrdersResponseType = OrderType[];

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
  order?: OrderType;
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
