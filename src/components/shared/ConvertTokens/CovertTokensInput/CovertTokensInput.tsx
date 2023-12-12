import React from "react";
import { Box, InputBase, Stack, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "store";
import { MAIN_TOKEN_ADDRESS } from "../../../../constants";
import { Token, TokenIcon, TokenSymbol } from "components/shared/Token";

type CovertTokensInputProps = {};

const CovertTokensInput = (props: CovertTokensInputProps) => {
  const { tokens } = useAppSelector(selectAppStore);
  const grinderyToken = tokens.find(
    (token) => token.address.toLowerCase() === MAIN_TOKEN_ADDRESS.toLowerCase()
  );

  return (
    <Box
      sx={{
        margin: "16px 16px 0",
        borderRadius: "16px",
        border: "1px solid var(--gr-theme-divider-color)",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing="16px"
        sx={{ padding: "16px 16px 12px", "& *": { lineHeight: "1.2" } }}
      >
        <Box>
          <Typography color="hint" mb="2px">
            <strong>You Exchange</strong>
          </Typography>
          <InputBase
            placeholder="0.00"
            sx={{ marginBottom: "2px" }}
            inputProps={{
              sx: {
                padding: 0,
                background: "transparent",
                color: "var(--tg-theme-text-color, #000000)",
                fontSize: "24px",
                lineHeight: "1",
                fontWeight: "600",
              },
            }}
          />
          <Typography
            variant="xs"
            color="hint"
            sx={{
              "& span": {
                textDecoration: "underline",
              },
            }}
          >
            Max: <span>3,500</span>
          </Typography>
        </Box>
        {grinderyToken && (
          <Box textAlign="right">
            <Token token={grinderyToken}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing="4px"
                mt="4px"
              >
                <TokenIcon size={20} />
                <Typography>
                  <strong>
                    <TokenSymbol />
                  </strong>
                </Typography>
              </Stack>
            </Token>
          </Box>
        )}
      </Stack>
      <Box
        sx={{
          width: "100%",
          height: "1px",
          background: "var(--gr-theme-divider-color)",
        }}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing="16px"
        sx={{ padding: "16px 16px 12px", "& *": { lineHeight: "1.2" } }}
      >
        <Box>
          <Typography color="hint" mb="2px">
            <strong>You add</strong>
          </Typography>
          <InputBase
            placeholder="0.00"
            sx={{ marginBottom: "2px" }}
            inputProps={{
              sx: {
                padding: 0,
                background: "transparent",
                color: "var(--tg-theme-text-color, #000000)",
                fontSize: "24px",
                lineHeight: "1",
                fontWeight: "600",
              },
            }}
          />
          <Typography variant="xs" color="hint">
            UST, USDC, MATIC, ...
          </Typography>
        </Box>

        <Box textAlign="right">
          <Typography mt="4px">
            <strong>USD</strong>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default CovertTokensInput;
