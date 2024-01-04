import React, { useCallback, useEffect, useState } from "react";
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
import { debounce } from "lodash";

const OrderTokensInputConvert = () => {
  const dispatch = useAppDispatch();
  const { tokens } = useAppSelector(selectAppStore);
  const [inputValue, setInputValue] = useState("");
  const grinderyToken =
    tokens.find(
      (token) =>
        token.address.toLowerCase() === MAIN_TOKEN_ADDRESS.toLowerCase()
    ) || (GRINDERY_ONE_TOKEN as TokenType);

  const changeState = debounce((value) => {
    dispatch(
      appStoreActions.setTGEInput({
        g1Quantity: value,
      })
    );
  }, 1200);

  const debouncedInputChange = useCallback(
    (value: string) => changeState(value),
    [changeState]
  );

  useEffect(() => {
    const maxBalance = grinderyToken.balance
      ? (
          parseFloat(grinderyToken.balance) /
          10 ** grinderyToken.decimals
        ).toString()
      : "";

    dispatch(
      appStoreActions.setTGEInput({
        g1Quantity: maxBalance,
      })
    );

    setInputValue(maxBalance);
  }, [grinderyToken.balance, grinderyToken.decimals, dispatch]);

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
          <Typography color="hint" mb="2px" variant="sm">
            <strong>You Exchange</strong>
          </Typography>
          <InputBase
            value={inputValue}
            placeholder="0.00"
            sx={{ marginBottom: "2px" }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              debouncedInputChange(event.target.value);
              setInputValue(event.target.value);
            }}
            inputProps={{
              sx: {
                padding: 0,
                background: "transparent",
                color: "var(--tg-theme-text-color, #000000)",
                fontSize: "24px",
                lineHeight: "1",
                fontWeight: "300",
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
                debouncedInputChange(maxBalance);
                setInputValue(maxBalance);
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

export default OrderTokensInputConvert;
