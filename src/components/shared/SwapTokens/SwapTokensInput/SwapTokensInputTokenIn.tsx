import React, { useCallback, useRef, useState } from "react";
import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../../store";
import TokensListItem from "../../TokensList/TokensListItem/TokensListItem";
import { debounce } from "lodash";
import { SwapTokensInputProps } from "./SwapTokensInput";
import { Token, TokenBalance, TokenIcon, TokenSymbol } from "../../Token";
import DialogSelect from "../../DialogSelect/DialogSelect";

const SwapTokensInputTokenIn = ({ tokensIn }: SwapTokensInputProps) => {
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const {
    swap: { input },
  } = useAppSelector(selectAppStore);
  const [open, setOpen] = useState(false);
  const selectedToken = tokensIn.find(
    (token) =>
      token.address === input.tokenIn &&
      token.chain === (input.chainId || "137")
  );

  const notEnoughBalance =
    parseFloat(input.amountIn) >
    parseFloat(selectedToken?.balance || "0") /
      10 ** (selectedToken?.decimals || 18);

  const balance =
    parseFloat(selectedToken?.balance || "0") /
    10 ** (selectedToken?.decimals || 18);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const request = debounce((value) => {
    dispatch(
      appStoreActions.setSwap({
        input: {
          ...input,
          amountIn: value,
        },
      })
    );
  }, 1200);

  const debouncedSearchChange = useCallback(
    (value: string) => request(value),
    [request]
  );

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing="16px"
        useFlexGap
        sx={{
          padding: "10px 10px 10px 20px",
          width: "100%",
          borderRadius: "10px",
          backgroundColor: "var(--tg-theme-secondary-bg-color, #efeff3)",
        }}
      >
        <Box>
          <Button
            onClick={handleOpen}
            variant="text"
            color="primary"
            startIcon={
              selectedToken ? (
                <Token token={selectedToken}>
                  <TokenIcon size={20} key={selectedToken.address} />
                </Token>
              ) : undefined
            }
            endIcon={<ArrowDropDownIcon />}
            sx={{
              padding: "2px 2px 2px 6px",
              marginLeft: "-4px",
              color: "var(--tg-theme-text-color, #000000)",
              borderRadius: "12px",
              "& .MuiButton-endIcon": {
                marginLeft: "4px !important",
              },
            }}
          >
            {selectedToken ? (
              <Token token={selectedToken}>
                <TokenSymbol />
              </Token>
            ) : (
              "Select token in"
            )}
          </Button>

          {selectedToken && (
            <Token token={selectedToken}>
              <Typography
                variant="xs"
                sx={{ marginTop: "4px", lineHeight: 1.5 }}
                color="hint"
              >
                Balance:{" "}
                <Button
                  onClick={() => {
                    if (inputRef.current) {
                      // @ts-ignore
                      inputRef.current.value = balance.toString();
                      debouncedSearchChange(balance.toString());
                    }
                  }}
                  sx={{
                    padding: "0",
                    minWidth: "unset",
                    fontSize: "12px",
                    lineHeight: 1,
                  }}
                >
                  <TokenBalance format="eth" />
                </Button>
              </Typography>
              {notEnoughBalance && (
                <Typography variant="xs" color="error" mt="4px">
                  Not enough <TokenSymbol />
                </Typography>
              )}
            </Token>
          )}
        </Box>
        <Stack
          sx={{ marginLeft: "auto", flex: 1 }}
          direction="column"
          alignItems="flex-end"
          justifyContent="center"
        >
          <InputBase
            sx={{
              width: "100%",
              "& input": {
                textAlign: "right",
                fontSize: "24px",
                fontWeight: "bold",
              },
            }}
            inputProps={{
              ref: inputRef,
              type: "number",
              min: 0,
              max: 100,
              sx: {
                padding: 0,
                color: "var(--tg-theme-text-color, #000000)",
              },
              name: "amountIn",
            }}
            placeholder="0"
            onChange={(e) => {
              debouncedSearchChange(e.target.value);
            }}
          />

          {selectedToken && (
            <Typography variant="xs" color="hint">
              {(
                parseFloat(selectedToken.price) *
                parseFloat(input.amountIn || "0")
              ).toFixed(2)}{" "}
              USD
            </Typography>
          )}
        </Stack>
      </Stack>

      <DialogSelect
        open={open}
        onClose={handleClose}
        search={{
          value: search,
          onChange: setSearch,
        }}
        items={(tokensIn || [])
          .filter((token) =>
            token.symbol.toLowerCase().includes(search.toLowerCase())
          )
          .filter((token) => token.address !== input.tokenOut)
          .filter((token) => token.chain === (input.chainId || "137"))}
        itemSize={48}
        item={(itemProps: { data: any; index: number; style: any }) => (
          <Box
            sx={{ ...itemProps.style, padding: "0 8px" }}
            key={itemProps.data[itemProps.index].id}
          >
            <TokensListItem
              key={itemProps.data[itemProps.index].address}
              passive
              token={itemProps.data[itemProps.index]}
              onClick={() => {
                dispatch(
                  appStoreActions.setSwap({
                    input: {
                      ...input,
                      tokenIn: itemProps.data[itemProps.index].address,
                    },
                  })
                );
                handleClose();
              }}
            />
          </Box>
        )}
      />
    </>
  );
};

export default SwapTokensInputTokenIn;
