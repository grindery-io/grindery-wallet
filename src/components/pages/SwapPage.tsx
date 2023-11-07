import React, { useEffect, useState } from "react";
import useBackButton from "../../hooks/useBackButton";
import { useSearchParams } from "react-router-dom";
import { appStoreActions, useAppDispatch } from "../../store";
import { SwapStatus } from "../../types/State";
import Loading from "../shared/Loading";
import { Box, Typography } from "@mui/material";

const SwapPage = () => {
  useBackButton();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const tokenIn = searchParams.get("id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(
      appStoreActions.setSwap({
        input: {
          tokenIn: tokenIn || "",
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
  }, [tokenIn, dispatch]);

  return !loading ? (
    <Box sx={{ textAlign: "center", margin: "50px" }}>
      {/*<SwapTokens />*/}
      <Typography sx={{ color: "var(--tg-theme-hint-color, #999999)" }}>
        Coming soon
      </Typography>
    </Box>
  ) : (
    <Loading />
  );
};

export default SwapPage;
