import React, { useEffect, useRef } from "react";
import { Box, InputBase, Stack, Typography } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";

type OrderTokensInputAddProps = {};

const OrderTokensInputAdd = (props: OrderTokensInputAddProps) => {
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();
  const {
    order: { input },
    balance: { value },
  } = useAppSelector(selectAppStore);

  const balanceWithoutDecimals = String(value || 0).split(".")[0];

  useEffect(() => {
    setTimeout(() => {
      if (
        inputRef.current &&
        balanceWithoutDecimals &&
        parseInt(balanceWithoutDecimals) > 0
      ) {
        // @ts-ignore
        inputRef.current.value = balanceWithoutDecimals;

        dispatch(
          appStoreActions.setOrderInput({
            add: balanceWithoutDecimals,
          })
        );
      }
    }, 100);
  }, [balanceWithoutDecimals, dispatch]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing="16px"
      sx={{ padding: "16px 16px 12px", "& *": { lineHeight: "1.2" } }}
    >
      <Box>
        <Typography color="hint" mb="2px" variant="sm">
          <strong>You Add</strong>
        </Typography>
        <InputBase
          placeholder="0.00"
          sx={{ marginBottom: "2px" }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
              appStoreActions.setOrder({
                input: {
                  ...input,
                  add: event.target.value,
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
              fontWeight: "300",
            },
          }}
        />
        <Typography variant="xs" color="hint">
          USDT, USDC, MATIC, ...
        </Typography>
      </Box>

      <Box textAlign="right">
        <Typography mt="4px">
          <strong>USD</strong>
        </Typography>
      </Box>
    </Stack>
  );
};

export default OrderTokensInputAdd;
