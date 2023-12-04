import React, { useEffect, useState } from "react";
import useBackButton from "../../hooks/useBackButton";
import { appStoreActions, useAppDispatch } from "../../store";
import { SwapStatus } from "../../types/State";
import Loading from "../shared/Loading/Loading";
import SwapTokens from "../shared/SwapTokens/SwapTokens";

const SwapPage = () => {
  useBackButton();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(
      appStoreActions.setSwap({
        input: {
          tokenIn: "",
          amountIn: "",
          tokenOut: "",
        },
        status: SwapStatus.WAITING,
        route: null,
      })
    );
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [dispatch]);

  return !loading ? <SwapTokens /> : <Loading />;
};

export default SwapPage;
