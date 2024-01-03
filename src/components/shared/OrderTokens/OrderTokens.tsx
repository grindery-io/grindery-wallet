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
import { OrderStatus } from "types";
import OrderTokensSentMessage from "./OrderTokensSentMessage";
import Loading from "../Loading/Loading";
import { getOrderQuote } from "services";
import OrderTokensError from "./OrderTokensError";

const OrderTokens = () => {
  const dispatch = useAppDispatch();
  const {
    order: { status, input },
  } = useAppSelector(selectAppStore);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(
      appStoreActions.setOrder({
        status: OrderStatus.LOADING,
      })
    );

    getOrderQuote(input.convert || "0", input.add || "0", controller)
      .then((res) => {
        dispatch(
          appStoreActions.setOrder({
            status: OrderStatus.WAITING,
            quote: res.data,
          })
        );
      })
      .catch((error) => {
        dispatch(
          appStoreActions.setOrder({
            status: OrderStatus.WAITING,
            quote: null,
          })
        );
      });

    return () => {
      controller.abort();
    };
  }, [input.convert, input.add, dispatch]);

  return (
    <>
      {(status === OrderStatus.WAITING || status === OrderStatus.LOADING) && (
        <Box sx={OrderTokensStyles}>
          <OrderTokensInfo />
          <OrderTokensInput />
          <OrderTokensOutput />
          <OrderTokensButton />
        </Box>
      )}
      {status === OrderStatus.SENDING && <Loading />}
      {status === OrderStatus.SENT && <OrderTokensSentMessage />}
      {status === OrderStatus.ERROR && <OrderTokensError />}
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
