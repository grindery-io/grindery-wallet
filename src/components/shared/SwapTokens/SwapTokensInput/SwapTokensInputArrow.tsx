import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box, IconButton } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../../store";

const SwapTokensInputArrow = () => {
  const dispatch = useAppDispatch();
  const {
    swap: { input },
  } = useAppSelector(selectAppStore);
  const [rotate, setRotate] = React.useState(false);
  return (
    <Box textAlign="center" sx={{ marginTop: "-10px", marginBottom: "-15px" }}>
      <IconButton
        onClick={() => {
          setRotate(!rotate);
          const currentTokenIn = input.tokenIn;
          const currentTokenOut = input.tokenOut;
          dispatch(
            appStoreActions.setSwap({
              input: {
                ...input,
                tokenIn: currentTokenOut,
                tokenOut: currentTokenIn,
              },
            })
          );
        }}
      >
        <ArrowDownwardIcon
          sx={{
            color: "var(--tg-theme-hint-color, #999999)",
            transition: "transform 0.3s ease-in-out",
            transform: `rotate(${rotate ? "0" : "360"}deg)`,
          }}
        />
      </IconButton>
    </Box>
  );
};

export default SwapTokensInputArrow;
