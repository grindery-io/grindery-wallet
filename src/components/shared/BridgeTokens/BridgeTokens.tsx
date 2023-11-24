import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { BridgeStatus } from "../../../types/State";
import BridgeTokensInput from "./BridgeTokensInput/BridgeTokensInput";
import BridgeTokensHeader from "./BridgeTokensHeader";
import BridgeTokensError from "./BridgeTokensError";
import BridgeTokensSentMessage from "./BridgeTokensSentMessage";
import BridgeTokensSending from "./BridgeTokensSending";
import { getBridgeRoutesRequest } from "../../../services/swap";
import { searchBridgeTokensRequest } from "../../../services/tokens";
import { MAIN_TOKEN_ADDRESS } from "../../../constants";
import { fixTokens } from "../../../utils/fixTokens";
import { TokenType } from "../Token";

const BridgeTokens = () => {
  const dispatch = useAppDispatch();
  const { swap, tokens } = useAppSelector(selectAppStore);
  const [ensoTokens, setEnsoTokens] = useState<TokenType[]>([]);
  const { status } = swap;
  const selectedTokenIn = tokens.find(
    (token) => token.address === swap.input.tokenIn
  );

  const allTokens = [
    ...tokens.filter((token) => token.address !== MAIN_TOKEN_ADDRESS),
    ...(ensoTokens || []),
  ];

  useEffect(() => {
    const controller = new AbortController();
    if (!swap.input.amountIn || !swap.input.tokenIn || !swap.input.tokenOut) {
      dispatch(
        appStoreActions.setBridge({
          route: null,
        })
      );
      return;
    }
    dispatch(
      appStoreActions.setBridge({
        status: BridgeStatus.LOADING,
      })
    );
    getBridgeRoutesRequest(swap.input, controller)
      .then((res) => {
        dispatch(
          appStoreActions.setBridge({
            route: res?.data || null,
            status: BridgeStatus.WAITING,
          })
        );
      })
      .catch((err) => {
        dispatch(
          appStoreActions.setBridge({
            route: null,
            status: BridgeStatus.WAITING,
          })
        );
      });

    return () => {
      controller.abort();
      dispatch(
        appStoreActions.setBridge({
          status: BridgeStatus.WAITING,
        })
      );
    };
  }, [swap.input, selectedTokenIn, dispatch]);

  useEffect(() => {
    const controller = new AbortController();
    searchBridgeTokensRequest(swap.input.chainId || "137", controller).then(
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
            .filter(
              (item) =>
                !tokens.find(
                  (stateItem) =>
                    stateItem.address.toLowerCase() ===
                    item.address.toLowerCase()
                )
            )
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
      <Box sx={BridgeTokensStyles}>
        <BridgeTokensHeader />
        <Box sx={BridgeTokensContentStyles}>
          {status === BridgeStatus.SENT && <BridgeTokensSentMessage />}
          {status === BridgeStatus.SENDING && <BridgeTokensSending />}
          {status === BridgeStatus.ERROR && <BridgeTokensError />}
          {(status === BridgeStatus.WAITING ||
            status === BridgeStatus.LOADING) && (
            <BridgeTokensInput allTokens={allTokens} />
          )}
        </Box>
      </Box>
    </>
  );
};

const BridgeTokensStyles = {
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

const BridgeTokensContentStyles = {
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

export default BridgeTokens;
