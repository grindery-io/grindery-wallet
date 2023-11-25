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
import { CHAINS, MAIN_TOKEN_ADDRESS } from "../../../constants";
import { fixTokens } from "../../../utils/fixTokens";
import { TokenType } from "../Token";
import { getBridgeQuoteRequest, getBridgeTokensRequest } from "services";
import Web3 from "web3";

const BridgeTokens = () => {
  const dispatch = useAppDispatch();
  const { user, bridge, tokens } = useAppSelector(selectAppStore);
  const [lifiTokens, setLifiTokens] = useState<TokenType[]>([]);
  const { status } = bridge;
  const selectedTokenIn = tokens.find(
    (token) => token.address === bridge.input.tokenIn
  );

  const allTokens = [
    ...tokens.filter((token) => token.address !== MAIN_TOKEN_ADDRESS),
    ...(lifiTokens || []),
  ];

  console.log("allTokens", allTokens);

  useEffect(() => {
    const controller = new AbortController();
    if (
      !bridge.input.amountIn ||
      !bridge.input.tokenIn ||
      !bridge.input.tokenOut
    ) {
      dispatch(
        appStoreActions.setBridge({
          quote: null,
        })
      );
      return;
    }
    dispatch(
      appStoreActions.setBridge({
        status: BridgeStatus.LOADING,
      })
    );
    getBridgeQuoteRequest({
      input: {
        ...bridge.input,
        amountIn: Web3.utils.toWei(parseFloat(bridge.input.amountIn), "ether"),
      },
      fromAddress: user?.patchwallet || "",
      controller,
    })
      .then((res) => {
        dispatch(
          appStoreActions.setBridge({
            quote: res?.data || null,
            status: BridgeStatus.WAITING,
          })
        );
      })
      .catch((err) => {
        dispatch(
          appStoreActions.setBridge({
            quote: null,
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
  }, [bridge.input, selectedTokenIn, user?.patchwallet, dispatch]);

  useEffect(() => {
    const controller = new AbortController();
    getBridgeTokensRequest(
      CHAINS.map((c) => parseInt(c.id)).join(","),
      controller
    ).then((res) => {
      setLifiTokens(
        [
          ...(res.data?.tokens?.[CHAINS[0].id] || []),
          ...(res.data?.tokens?.[CHAINS[1].id] || []),
        ]
          .map((item) => ({
            name: item.name,
            symbol: item.symbol,
            address: item.address,
            decimals: item.decimals,
            icon: item.logoURI,
            chain: item.chainId.toString(),
            balance: "0",
            price: item.priceUSD,
          }))
          .filter(
            (item) =>
              !tokens.find(
                (stateItem) =>
                  stateItem.address.toLowerCase() ===
                    item.address.toLowerCase() &&
                  stateItem.chain.toLowerCase() === item.chain.toLowerCase()
              )
          )
          .map(fixTokens)
      );
    });
    return () => {
      controller.abort();
    };
  }, [tokens]);

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
