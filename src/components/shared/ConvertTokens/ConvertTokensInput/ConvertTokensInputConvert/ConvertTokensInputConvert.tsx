import React, { useRef } from "react";
import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";
import {
  GRINDERY_ONE_TOKEN,
  MAIN_TOKEN_ADDRESS,
} from "../../../../../constants";
import {
  Token,
  TokenBalance,
  TokenIcon,
  TokenSymbol,
  TokenType,
} from "components/shared/Token";

type ConvertTokensInputConvertProps = {};

const ConvertTokensInputConvert = (props: ConvertTokensInputConvertProps) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef(null);
  const {
    tokens,
    convert: { input },
  } = useAppSelector(selectAppStore);
  const grinderyToken =
    tokens.find(
      (token) =>
        token.address.toLowerCase() === MAIN_TOKEN_ADDRESS.toLowerCase()
    ) || (GRINDERY_ONE_TOKEN as TokenType);

  return (
    <Token token={grinderyToken}>
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(
                appStoreActions.setConvert({
                  input: {
                    ...input,
                    convert: event.target.value,
                  },
                })
              );
            }}
            inputProps={{
              ref: inputRef,
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
            Max:{" "}
            <Button
              sx={{
                padding: 0,
                textDecoration: "underline",
                margin: 0,
                minWidth: "unset",
                background: "transparent",
                border: "none",
                fontSize: "inherit",
                color: "inherit",
                fontWeight: "inherit",
                lineHeight: "inherit",
                "&:hover": {
                  background: "transparent",
                  border: "none",
                },
              }}
              onClick={() => {
                const maxBalance = (
                  parseFloat(grinderyToken.balance) /
                  10 ** grinderyToken.decimals
                ).toString();
                dispatch(
                  appStoreActions.setConvert({
                    input: {
                      ...input,
                      convert: maxBalance,
                    },
                  })
                );
                if (inputRef.current) {
                  // @ts-ignore
                  inputRef.current.value = maxBalance;
                }
              }}
            >
              <TokenBalance />
            </Button>
          </Typography>
        </Box>
        {grinderyToken && (
          <Box textAlign="right">
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
          </Box>
        )}
      </Stack>
    </Token>
  );
};

export default ConvertTokensInputConvert;
