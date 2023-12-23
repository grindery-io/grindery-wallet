import React, { useCallback, useEffect, useState } from "react";
import { Box, InputBase, Stack, Typography } from "@mui/material";
import { debounce } from "lodash";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";

const OrderTokensInputAdd = () => {
  const dispatch = useAppDispatch();
  const {
    balance: { value },
  } = useAppSelector(selectAppStore);
  const [inputValue, setInputValue] = useState("");
  const balanceWithoutDecimals = String(value || 0).split(".")[0];

  const changeState = debounce((value) => {
    dispatch(
      appStoreActions.setOrderInput({
        add: value,
      })
    );
  }, 1200);

  const debouncedInputChange = useCallback(
    (value: string) => changeState(value),
    [changeState]
  );

  useEffect(() => {
    if (balanceWithoutDecimals && parseInt(balanceWithoutDecimals) > 0) {
      dispatch(
        appStoreActions.setOrderInput({
          add: balanceWithoutDecimals,
        })
      );
      setInputValue(balanceWithoutDecimals);
    }
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
