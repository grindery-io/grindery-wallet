import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { ConvertQuoteType, ConvertStatus } from "../../../types/State";
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
import ConvertTokensHeader from "./ConvertTokensHeader";
import ConvertTokensSentMessage from "./ConvertTokensSentMessage";
import ConvertTokensSending from "./ConvertTokensSending";
import ConvertTokensError from "./ConvertTokensError";
import ConvertTokensInput from "./ConvertTokensInput/ConvertTokensInput";

const ConvertTokens = () => {
  const dispatch = useAppDispatch();
  const { user, convert, tokens } = useAppSelector(selectAppStore);
  const [lifiTokens, setLifiTokens] = useState<TokenType[]>([]);
  const [bridgeTokens, setConvertTokens] = useState<TokenType[]>([]);
  const { status } = convert;

  console.log("lifiTokens", lifiTokens);

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

  console.log("tokensIn", tokensIn);

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
      !convert.input.amountIn ||
      !convert.input.tokenIn ||
      !convert.input.tokenOut
    ) {
      dispatch(
        appStoreActions.setConvert({
          quote: null,
        })
      );
      return;
    }
    dispatch(
      appStoreActions.setConvert({
        status: ConvertStatus.LOADING,
      })
    );
    getBridgeQuoteRequest({
      input: {
        ...convert.input,
        amountIn: Web3.utils.toWei(parseFloat(convert.input.amountIn), "ether"),
      },
      fromAddress: user?.patchwallet || "",
      controller,
    })
      .then((res) => {
        dispatch(
          appStoreActions.setConvert({
            quote: res?.data
              ? { quote_type: ConvertQuoteType.BRIDGE, ...res.data }
              : null,
            status: ConvertStatus.WAITING,
          })
        );
      })
      .catch((err) => {
        dispatch(
          appStoreActions.setConvert({
            quote: null,
            status: ConvertStatus.WAITING,
          })
        );
      });

    return () => {
      controller.abort();
      dispatch(
        appStoreActions.setConvert({
          status: ConvertStatus.WAITING,
        })
      );
    };
  }, [convert.input, user?.patchwallet, dispatch]);

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
    if (!convert.input.tokenIn || !convert.input.chainIn) {
      return;
    }
    getBridgeConnectionsRequest({
      controller,
      fromToken: convert.input.tokenIn,
      fromChain: convert.input.chainIn,
    }).then((res) => {
      setConvertTokens(
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
  }, [convert.input.chainIn, convert.input.tokenIn]);

  return (
    <>
      <Box sx={ConvertTokensStyles}>
        <ConvertTokensHeader />
        <Box sx={ConvertTokensContentStyles}>
          {status === ConvertStatus.SENT && <ConvertTokensSentMessage />}
          {status === ConvertStatus.SENDING && <ConvertTokensSending />}
          {status === ConvertStatus.ERROR && <ConvertTokensError />}
          {(status === ConvertStatus.WAITING ||
            status === ConvertStatus.LOADING) && (
            <ConvertTokensInput tokensIn={tokensIn} tokensOut={tokensOut} />
          )}
        </Box>
      </Box>
    </>
  );
};

const ConvertTokensStyles = {
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

const ConvertTokensContentStyles = {
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

export default ConvertTokens;
