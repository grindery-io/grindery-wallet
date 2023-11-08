import React from "react";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { SwapStatus, SwapStateInput } from "../../../../types/State";

const SwapTokensInputButtons = ({
  input,
  status,
  setStatus,
}: {
  input: SwapStateInput;
  status: SwapStatus;
  setStatus: (status: SwapStatus) => void;
}) => {
  let navigate = useNavigate();
  //const [countFailed, setCountFailed] = React.useState(0);
  const countFailed = 0;

  return (
    <Stack
      direction="row"
      spacing="16px"
      mt="auto"
      mb="10px"
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
          !input.amountIn ||
          !input.tokenIn ||
          !input.tokenOut ||
          countFailed > 3
        }
        size="large"
        onClick={() => {
          if (window.Telegram?.WebApp?.showConfirm) {
            window.Telegram?.WebApp?.showConfirm(
              "You are going to swap " +
                input.amountIn +
                " tokens. This action can not be undone. Are you sure?",
              (confirmed: boolean) => {
                if (confirmed) {
                  alert("Coming soon");
                }
              }
            );
          } else {
            const confirmed = window.confirm(
              "You are going to swap " +
                input.amountIn +
                " tokens. This action can not be undone. Are you sure?"
            );
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
  );
};

export default SwapTokensInputButtons;
