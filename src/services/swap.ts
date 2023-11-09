import axios from "axios";
import { SwapStateInput } from "../types/State";
import { BOT_API_URL } from "../constants";

export const getSwapRoutesRequest = async (
  input: SwapStateInput,
  controller: AbortController
) => {
  return await axios.get(
    `${BOT_API_URL}/v2/swap?tokenIn=${input.tokenIn}&tokenOut=${input.tokenOut}&amountIn=${input.amountIn}`,
    {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
      },
    }
  );
};

export type SwapTokenRequestParams = {
  to: string;
  data: string;
  value: string;
  tokenIn: string;
  amountIn: string;
  tokenOut: string;
  amountOut: string;
  gas?: string;
  priceImpact?: string;
};

export const swapTokensRequest = async (
  params: SwapTokenRequestParams,
  controller?: AbortController
) => {
  return await axios.post(`${BOT_API_URL}/v2/swap`, params, {
    signal: controller?.signal,
    headers: {
      Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
    },
  });
};
