import React, { useEffect, useState } from "react";
import useBackButton from "../../hooks/useBackButton";
import { useSearchParams } from "react-router-dom";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { SwapStatus } from "../../types/State";
import Loading from "../shared/Loading";
import SwapTokens from "../shared/SwapTokens/SwapTokens";

const SwapPage = () => {
  useBackButton();
  const dispatch = useAppDispatch();
  const {
    tokens: { items },
  } = useAppSelector(selectAppStore);
  const [searchParams] = useSearchParams();
  const tokenIn = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const address1 = items?.[1]?.address;
  const address2 = items?.[2]?.address;

  useEffect(() => {
    dispatch(
      appStoreActions.setSwap({
        input: {
          tokenIn: tokenIn || address1 || "",
          amountIn: "",
          tokenOut: address2 || "",
        },
        status: SwapStatus.WAITING,
        route: null,
      })
    );
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [tokenIn, address1, address2, dispatch]);

  return !loading ? <SwapTokens /> : <Loading />;
};

export default SwapPage;
