import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box, IconButton } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../../store";

const BridgeTokensInputArrow = () => {
  const dispatch = useAppDispatch();
  const {
    bridge: { input },
  } = useAppSelector(selectAppStore);
  const [rotate, setRotate] = React.useState(false);
  return (
    <Box textAlign="center" sx={{ marginTop: "-10px", marginBottom: "-15px" }}>
      <IconButton
        onClick={() => {
          setRotate(!rotate);
          const currentTokenIn = input.tokenIn;
          const currentTokenOut = input.tokenOut;
          const currentChainIn = input.chainIn;
          const currentChainOut = input.chainOut;
          dispatch(
            appStoreActions.setBridge({
              input: {
                ...input,
                tokenIn: currentTokenOut,
                tokenOut: currentTokenIn,
                chainIn: currentChainOut,
                chainOut: currentChainIn,
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

export default BridgeTokensInputArrow;
