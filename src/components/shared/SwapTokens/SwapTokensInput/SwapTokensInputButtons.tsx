import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { SwapStatus, Token } from "../../../../types/State";
import { selectAppStore, useAppSelector } from "../../../../store";

const SwapTokensInputButtons = ({ allTokens }: { allTokens: Token[] }) => {
  let navigate = useNavigate();
  //const [countFailed, setCountFailed] = React.useState(0);
  const countFailed = 0;
  const {
    swap: { input, status },
  } = useAppSelector(selectAppStore);

  const selectedTokenIn = allTokens.find(
    (token) => token.address === input.tokenIn
  );

  return (
    <Box mt="auto" mb="10px">
      <Stack
        direction="row"
        spacing="16px"
        bgcolor="var(--tg-theme-bg-color, #ffffff)"
      >
        <Button
          variant="outlined"
          onClick={() => {
            navigate(-1);
          }}
          size="large"
          fullWidth
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          fullWidth
          disabled={
            status === SwapStatus.SENDING ||
            status === SwapStatus.LOADING ||
            !input.amountIn ||
            !input.tokenIn ||
            !input.tokenOut ||
            countFailed > 3
          }
          size="large"
          onClick={() => {
            const message = `You are going to swap ${input.amountIn} ${selectedTokenIn?.symbol}. This action can not be undone. Are you sure?`;
            if (window.Telegram?.WebApp?.showConfirm) {
              window.Telegram?.WebApp?.showConfirm(
                message,
                (confirmed: boolean) => {
                  if (confirmed) {
                    alert("Coming soon");
                  }
                }
              );
            } else {
              const confirmed = window.confirm(message);
              if (confirmed) {
                alert("Coming soon");
              }
            }
          }}
        >
          {countFailed > 3
            ? "Try later..."
            : status === SwapStatus.SENDING
            ? "Swapping..."
            : "Swap"}
        </Button>
      </Stack>
      <Typography
        color="hint"
        variant="xs"
        textAlign="center"
        margin="10px 0 0px"
      >
        Powered by{" "}
        <a href="https://www.enso.finance/" target="_blank" rel="noreferrer">
          Enso
        </a>
      </Typography>
    </Box>
  );
};

export default SwapTokensInputButtons;
