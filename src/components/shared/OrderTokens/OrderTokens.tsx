import React, { useEffect } from "react";
import { Box } from "@mui/material";
import OrderTokensInput from "./OrderTokensInput/OrderTokensInput";
import OrderTokensOutput from "./OrderTokensOutput/OrderTokensOutput";
import OrderTokensButton from "./OrderTokensButton/OrderTokensButton";
import OrderTokensInfo from "./OrderTokensInfo/OrderTokensInfo";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";
import { TGEStatus } from "types";
import OrderTokensSentMessage from "./OrderTokensSentMessage";
import Loading from "../Loading/Loading";
import { getOrderQuote } from "services";
import OrderTokensError from "./OrderTokensError";

const OrderTokens = () => {
  const dispatch = useAppDispatch();
  const {
    tge: { status, input },
  } = useAppSelector(selectAppStore);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(
      appStoreActions.setTGE({
        status: TGEStatus.LOADING,
      })
    );

    getOrderQuote(input.g1Quantity || "0", input.usdQuantity || "0", controller)
      .then((res) => {
        dispatch(
          appStoreActions.setTGE({
            status: TGEStatus.WAITING,
            quote: res.data,
          })
        );
      })
      .catch((error) => {
        dispatch(
          appStoreActions.setTGE({
            status: TGEStatus.WAITING,
            quote: null,
          })
        );
      });

    return () => {
      controller.abort();
    };
  }, [input.g1Quantity, input.usdQuantity, dispatch]);

  return (
    <>
      {(status === TGEStatus.WAITING || status === TGEStatus.LOADING) && (
        <Box sx={OrderTokensStyles}>
          <OrderTokensInfo />
          <OrderTokensInput />
          <OrderTokensOutput />
          <OrderTokensButton />
        </Box>
      )}
      {status === TGEStatus.SENDING && (
        <>
          <Loading title="Sending G1 transaction..." />
        </>
      )}
      {status === TGEStatus.SENT && <OrderTokensSentMessage />}
      {status === TGEStatus.ERROR && <OrderTokensError />}
    </>
  );
};

const OrderTokensStyles = {
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  gap: "0px",
  flexWrap: "nowrap",
};

export default OrderTokens;
