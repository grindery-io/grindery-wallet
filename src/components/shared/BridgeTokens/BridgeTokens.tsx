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
import { CHAINS } from "../../../constants";
import { fixTokens } from "../../../utils/fixTokens";
import { TokenType } from "../Token";
import {
  getBridgeConnectionsRequest,
  getBridgeQuoteRequest,
  getBridgeTokensRequest,
} from "services";
import Web3 from "web3";
import _ from "lodash";

const BridgeTokens = () => {
  const dispatch = useAppDispatch();
  const { user, bridge, tokens } = useAppSelector(selectAppStore);
  const [lifiTokens, setLifiTokens] = useState<TokenType[]>([]);
  const [bridgeTokens, setBridgeTokens] = useState<TokenType[]>([]);
  const { status } = bridge;

  const tokensIn = lifiTokens
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
        return { ...token, price: t.price || "0" };
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

  const tokensOut = bridgeTokens
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
        return { ...token, price: t.price || "0" };
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
  }, [bridge.input, user?.patchwallet, dispatch]);

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
          .map(fixTokens)
      );
    });
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    getBridgeConnectionsRequest({
      controller,
      fromToken: bridge.input.tokenIn,
      fromChain: bridge.input.chainIn,
    }).then((res) => {
      setBridgeTokens(
        _.flatten(
          (res.data?.connections || []).map((connection) => connection.toTokens)
        )
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
          .map(fixTokens)
      );
    });
    return () => {
      controller.abort();
    };
  }, [bridge.input.chainIn, bridge.input.tokenIn]);

  console.log("bridgeTokens", bridgeTokens);

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
            <BridgeTokensInput tokensIn={tokensIn} tokensOut={tokensOut} />
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
