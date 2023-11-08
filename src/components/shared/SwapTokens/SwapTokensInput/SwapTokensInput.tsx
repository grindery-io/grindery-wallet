import React from "react";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../../store";
import SwapTokensInputButtons from "./SwapTokensInputButtons";
import SwapTokensInputTokenIn from "./SwapTokensInputTokenIn";
import SwapTokensInputTokenOut from "./SwapTokensInputTokenOut";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box, Typography } from "@mui/material";

const SwapTokensInput = () => {
  const dispatch = useAppDispatch();
  const { swap } = useAppSelector(selectAppStore);
  const { status, input } = swap;
  return (
    <>
      <SwapTokensInputTokenIn />
      <Box textAlign="center">
        <ArrowDownwardIcon
          sx={{ color: "var(--tg-theme-hint-color, #999999)" }}
        />
      </Box>
      <SwapTokensInputTokenOut />
      <Box sx={{ textAlign: "center", margin: "50px" }}>
        <Typography sx={{ color: "var(--tg-theme-hint-color, #999999)" }}>
          Coming soon
        </Typography>
      </Box>
      <SwapTokensInputButtons
        input={input}
        setStatus={(status) => {
          dispatch(appStoreActions.setSwap({ status }));
        }}
        status={status}
      />
    </>
  );
};

export default SwapTokensInput;
