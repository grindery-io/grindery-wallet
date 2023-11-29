import React from "react";
import { Stack, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "store";
import { MAIN_TOKEN_ADDRESS } from "../../../../constants";

const SendTokensInputGas = () => {
  const {
    send: { input },
    tokens,
  } = useAppSelector(selectAppStore);
  const selectedToken = tokens.find(
    (t) =>
      t.address.toLowerCase() === input.tokenAddress?.toLowerCase() &&
      t.chain === input.chainId
  );
  return (
    <Stack width="100%" flex="1" alignItems="center" justifyContent="center">
      <Typography textAlign="center">
        Grindery pays the gas fees for you 🥰
      </Typography>
      {input.tokenAddress && input.tokenAddress !== MAIN_TOKEN_ADDRESS && (
        <Typography mt="20px" textAlign="center" variant="sm">
          Please be aware that sending {selectedToken?.symbol || "ERC20 tokens"}{" "}
          is in the beta testing stage ⚠️
        </Typography>
      )}
    </Stack>
  );
};

export default SendTokensInputGas;
