import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { SwapStatus, Token } from "../../../types/State";
import SendTokensInput from "./SwapTokensInput/SwapTokensInput";
import SwapTokensHeader from "./SwapTokensHeader";
import SwapTokensError from "./SwapTokensError";
import SwapTokensSentMessage from "./SwapTokensSentMessage";
import SwapTokensSending from "./SwapTokensSending";
import { getSwapRoutesRequest } from "../../../services/swap";
import { searchTokensRequest } from "../../../services/tokens";
import { MAIN_TOKEN_ADDRESS } from "../../../constants";
import { fixTokens } from "../../../utils/fixTokens";

const SwapTokens = () => {
  const dispatch = useAppDispatch();
  const { swap, tokens } = useAppSelector(selectAppStore);
  const [ensoTokens, setEnsoTokens] = useState<Token[]>([]);
  const { status } = swap;
  const selectedTokenIn = tokens.items.find(
    (token) => token.address === swap.input.tokenIn
  );

  const allTokens = [
    ...tokens.items.filter((token) => token.address !== MAIN_TOKEN_ADDRESS),
    ...(ensoTokens || []),
  ];

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
    searchTokensRequest("", controller).then((res) => {
      setEnsoTokens(
        (res.data || [])
          .filter(
            (item: Token) =>
              !tokens.items.find(
                (stateItem: Token) =>
                  stateItem.id.toLowerCase() === item.id.toLowerCase()
              )
          )
          .map(fixTokens)
      );
    });
    return () => {
      controller.abort();
    };
  }, [tokens.items]);

  return (
    <>
      <Box sx={SwapTokensStyles}>
        <SwapTokensHeader />
        <Box sx={SwapTokensContentStyles}>
          {status === SwapStatus.SENT && <SwapTokensSentMessage />}
          {status === SwapStatus.SENDING && <SwapTokensSending />}
          {status === SwapStatus.ERROR && <SwapTokensError />}
          {(status === SwapStatus.WAITING || status === SwapStatus.LOADING) && (
            <SendTokensInput allTokens={allTokens} />
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
