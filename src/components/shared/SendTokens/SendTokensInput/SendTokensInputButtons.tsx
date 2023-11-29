import React from "react";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { SendStateInput, SendStatus } from "types";
import { selectAppStore, useAppSelector } from "store";
import { sendTokensRequestV2 } from "services";
import { CHAINS, MAIN_TOKEN_ADDRESS } from "../../../../constants";

const SendTokensInputButtons = ({
  input,
  status,
  setStatus,
}: {
  input: SendStateInput;
  status: string;
  setStatus: (status: SendStatus) => void;
}) => {
  let navigate = useNavigate();
  const [countFailed, setCountFailed] = React.useState(0);
  const {
    debug: { features, enabled },
    contacts: { items },
    tokens,
  } = useAppSelector(selectAppStore);

  const { chainId, tokenAddress } = input;
  const selectedToken = tokens.find(
    (token) =>
      token.address.toLowerCase() === tokenAddress?.toLowerCase() &&
      token.chain === chainId
  );
  const selectedChain = CHAINS.find((chain) => chain.id === chainId);

  const recipient = Array.isArray(input.recipient)
    ? input.recipient.map((id) => items?.find((item) => item.id === id))
    : items?.find((item) => item.id === input.recipient);

  const sendTokens = async () => {
    if (isNaN(parseFloat(input.amount)) || parseFloat(input.amount) <= 0) {
      setStatus(SendStatus.ERROR);
      return;
    }
    if (!input.recipient) {
      return;
    }
    if (countFailed > 3) {
      return;
    }
    setStatus(SendStatus.SENDING);
    try {
      const res = await sendTokensRequestV2({
        recipientTgId: input.recipient,
        amount: input.amount,
        message: input.message,
        recipientHandle: Array.isArray(recipient)
          ? recipient?.map((item) => item?.username || "")
          : recipient?.username || "",
        recipientName: Array.isArray(recipient)
          ? recipient?.map(
              (item) =>
                `${item?.firstName || ""}${
                  item?.lastName ? " " + item?.lastName : ""
                }`
            )
          : recipient
          ? `${recipient.firstName || ""}${
              recipient.lastName ? " " + recipient.lastName : ""
            }`
          : "",
        withConfirmation: Boolean(enabled && features?.SENDING_CONFIRMATION),
        chainId: input.chainId || "137",
        tokenAddress: input.tokenAddress || MAIN_TOKEN_ADDRESS,
      });
      if (res.data?.success) {
        setStatus(SendStatus.SENT);
      } else {
        setStatus(SendStatus.ERROR);
      }
    } catch (error) {
      console.error("send tokens error", error);
      setCountFailed(countFailed + 1);
      setStatus(SendStatus.ERROR);
    }
  };

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
          status === "sending" ||
          !input.amount ||
          !input.recipient ||
          countFailed > 3
        }
        size="large"
        onClick={() => {
          const amount = Array.isArray(input.recipient)
            ? (parseFloat(input.amount) * input.recipient.length).toString()
            : input.amount;
          const symbol = selectedToken?.symbol || "G1";
          const chainName = selectedChain?.label || "Polygon";
          const message = `You are going to send ${amount} ${symbol} on ${chainName} blockchain.\nThis action can not be undone.\n\nAre you sure?`;
          if (window.Telegram?.WebApp?.showConfirm) {
            window.Telegram?.WebApp?.showConfirm(
              message,
              (confirmed: boolean) => {
                if (confirmed) {
                  sendTokens();
                }
              }
            );
          } else {
            const confirmed = window.confirm(message);
            if (confirmed) {
              sendTokens();
            }
          }
        }}
      >
        {countFailed > 3
          ? "Try later..."
          : status === "sending"
          ? "Sending..."
          : "Send"}
      </Button>
    </Stack>
  );
};

export default SendTokensInputButtons;
