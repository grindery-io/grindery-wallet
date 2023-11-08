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
