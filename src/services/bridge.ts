import axios from "axios";
import { BridgeStateInput } from "types";

export type SearchBridgeTokensResponseType = {
  tokens: {
    [key: string]: {
      address: string;
      decimals: number;
      symbol: string;
      chainId: number;
      coinKey: string;
      name: string;
      logoURI: string;
      priceUSD: string;
    }[];
  };
};

export const searchBridgeTokensRequest = async (
  chainIds?: string, // see lifi docs: https://docs.li.fi/li.fi-api/li.fi-api/requesting-all-known-tokens
  controller?: AbortController
) => {
  return await axios.get<SearchBridgeTokensResponseType>(
    `https://li.quest/v1/tokens?chains=${chainIds || "137"}`,
    {
      signal: controller?.signal,
    }
  );
};

export type GetBridgeQuoteResponseToken = {
  address: string;
  chainId: number;
  symbol: string;
  decimals: number;
  name: string;
  coinKey: string;
  logoURI: string;
  priceUSD: string;
};

export type GetBridgeQuoteResponseType = {
  id: string;
  type: "lifi" | "cross" | "swap"; // this can be a 'cross' (across chains), a 'swap' (same chain), or a 'lifi' (can wrap both types of transactions internally) transaction
  tool: string; // the bridge or exchanged used for this transaction
  toolDetails: {
    key: string;
    name: string;
    logoURI: string;
  };
  action: {
    // information about the token being sent
    fromToken: GetBridgeQuoteResponseToken;
    fromAmount: string;
    // information about the token being received
    toToken: GetBridgeQuoteResponseToken;
    fromChainId: number;
    toChainId: number;
    slippage: number;
    fromAddress: string; // the sender's address
    toAddress: string; // // the receiver's address
  };
  estimate: {
    tool: string;
    approvalAddress: string;
    toAmountMin: string;
    toAmount: string;
    fromAmount: string;
    feeCosts: {
      name: string;
      description: string;
      // information about the token that the gas is payed in
      token: GetBridgeQuoteResponseToken;
      amount: string;
      amountUSD: string;
      percentage: string;
      included: boolean;
    }[];
    gasCosts: {
      type: string;
      price: string;
      estimate: string;
      limit: string;
      amount: string;
      amountUSD: string;
      token: GetBridgeQuoteResponseToken;
    }[];
    executionDuration: number;
    fromAmountUSD: string;
    toAmountUSD: string;
  };
  // steps that will be executed internally as part of this transaction
  includedSteps: {
    id: string;
    type: string;
    action: {
      fromChainId: number;
      fromAmount: string;
      fromToken: GetBridgeQuoteResponseToken;
      toChainId: number;
      toToken: GetBridgeQuoteResponseToken;
      slippage: number;
      fromAddress: string;
      toAddress: string;
    };
    estimate: {
      tool: string;
      fromAmount: string;
      toAmount: string;
      toAmountMin: string;
      approvalAddress: string;
      executionDuration: number;
      feeCosts: {
        name: string;
        description: string;
        token: GetBridgeQuoteResponseToken;
        amount: string;
        amountUSD: string;
        percentage: string;
        included: boolean;
      }[];

      gasCosts: {
        type: string;
        price: string;
        estimate: string;
        limit: string;
        amount: string;
        amountUSD: string;
        token: GetBridgeQuoteResponseToken;
      }[];

      toolData: {
        path: string[];
        routerAddress: string;
      };
    };
    tool: string;
    toolDetails: {
      key: string;
      name: string;
      logoURI: string;
    };
  }[];

  integrator: string;
  // the ethers.js transaction request
  transactionRequest: {
    data: string;
    to: string; // the contract address
    value: string;
    from: string; // the sender
    chainId: number;
    gasPrice: string;
    gasLimit: string;
  };
};

export const getBridgeQuoteRequest = async ({
  input,
  fromAddress,
  controller,
}: {
  input: BridgeStateInput;
  fromAddress: string;
  controller?: AbortController;
}) => {
  return await axios.get<GetBridgeQuoteResponseType>(
    `https://li.quest/v1/quote?fromChain=${input.chainIn}&toChain=${input.chainOut}&fromToken=${input.tokenIn}&toToken=${input.tokenOut}&fromAmount=${input.amountIn}&fromAddress=${fromAddress}`,
    {
      signal: controller?.signal,
      headers: {
        Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
      },
    }
  );
};
