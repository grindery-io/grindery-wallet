import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { SwapStatus } from "../../../types/State";
import SwapTokensInput from "./SwapTokensInput/SwapTokensInput";
import SwapTokensHeader from "./SwapTokensHeader";
import SwapTokensError from "./SwapTokensError";
import SwapTokensSentMessage from "./SwapTokensSentMessage";
import SwapTokensSending from "./SwapTokensSending";
import { getSwapRoutesRequest } from "../../../services/swap";
import { searchSwapTokensRequest } from "../../../services/tokens";
import { fixTokens } from "../../../utils/fixTokens";
import { TokenType } from "../Token";

const SwapTokens = () => {
  const dispatch = useAppDispatch();
  const { swap, tokens } = useAppSelector(selectAppStore);
  const [ensoTokens, setEnsoTokens] = useState<TokenType[]>([]);
  const { status } = swap;
  const selectedTokenIn = tokens.find(
    (token) => token.address === swap.input.tokenIn
  );

  const tokensIn = ensoTokens
    .map((t) => {
      const token = tokens.find((token) => {
        const address =
          t.address === "0x0000000000000000000000000000000000000000"
            ? "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
            : t.address;

        return (
          token.address.toLowerCase() === address.toLowerCase() &&
          token.chain === t.chain
        );
      });
      if (token) {
        return { ...token, price: token.price || t.price || "0" };
      }
      return t;
    })
    .sort((a, b) => {
      const balanceA = parseFloat(a.balance) / 10 ** a.decimals;
      const balanceB = parseFloat(b.balance) / 10 ** b.decimals;

      if (balanceA > balanceB) {
        return -1;
      }
      if (balanceA < balanceB) {
        return 1;
      }

      return 0;
    });

  /*const tokensIn = [
    ...tokens.filter(
      (token) =>
        token.address.toLowerCase() !== MAIN_TOKEN_ADDRESS.toLowerCase()
    ),
    ...(ensoTokens || []),
  ];*/

  useEffect(() => {
    const controller = new AbortController();
    if (!swap.input.amountIn || !swap.input.tokenIn || !swap.input.tokenOut) {
      dispatch(
        appStoreActions.setSwap({
          route: null,
        })
      );
      return;
    }
    dispatch(
      appStoreActions.setSwap({
        status: SwapStatus.LOADING,
      })
    );
    getSwapRoutesRequest(swap.input, controller)
      .then((res) => {
        dispatch(
          appStoreActions.setSwap({
            route: res?.data || null,
            status: SwapStatus.WAITING,
          })
        );
      })
      .catch((err) => {
        dispatch(
          appStoreActions.setSwap({
            route: null,
            status: SwapStatus.WAITING,
          })
        );
      });

    return () => {
      controller.abort();
      dispatch(
        appStoreActions.setSwap({
          status: SwapStatus.WAITING,
        })
      );
    };
  }, [swap.input, selectedTokenIn, dispatch]);

  useEffect(() => {
    const controller = new AbortController();
    searchSwapTokensRequest(swap.input.chainId || "137", controller).then(
      (res) => {
        setEnsoTokens(
          (res.data || [])
            .map((item) => ({
              name: item.name,
              symbol: item.symbol,
              address: item.address,
              decimals: item.decimals,
              icon: item.logoURI,
              chain: item.chainId.toString(),
              balance: "0",
              price: "0",
            }))
            .map(fixTokens)
        );
      }
    );
    return () => {
      controller.abort();
    };
  }, [tokens, swap.input.chainId]);

  return (
    <>
      <Box sx={SwapTokensStyles}>
        <SwapTokensHeader />
        <Box sx={SwapTokensContentStyles}>
          {status === SwapStatus.SENT && <SwapTokensSentMessage />}
          {status === SwapStatus.SENDING && <SwapTokensSending />}
          {status === SwapStatus.ERROR && <SwapTokensError />}
          {(status === SwapStatus.WAITING || status === SwapStatus.LOADING) && (
            <SwapTokensInput tokensIn={tokensIn} />
          )}
        </Box>
      </Box>
    </>
  );
};

const SwapTokensStyles = {
  width: "100%",
  paddingTop: "16px",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  gap: "0px",
  flexWrap: "nowrap",
};

const SwapTokensContentStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  gap: "20px",
  flexWrap: "nowrap",
  flex: 1,
  marginTop: "16px",
  padding: "0 16px",
};

export default SwapTokens;
