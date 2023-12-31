import React, { useEffect, useState } from "react";
import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../../store";
import TokensListItem from "../../TokensList/TokensListItem/TokensListItem";
import { SwapStatus } from "../../../../types/State";
import { SwapTokensInputProps } from "./SwapTokensInput";
import { Token, TokenBalance, TokenIcon, TokenSymbol } from "../../Token";
import { getTokensPriceRequest } from "../../../../services/tokens";
import DialogSelect from "../../DialogSelect/DialogSelect";
import { isDarkTheme } from "utils";

const SwapTokensInputTokenOut = ({ tokensIn }: SwapTokensInputProps) => {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const { user, swap, tokens } = useAppSelector(selectAppStore);
  const { input } = swap;
  const [open, setOpen] = useState(false);
  const selectedToken = tokensIn.find(
    (token) =>
      token.address === input.tokenOut &&
      token.chain === (input.chainId || "137")
  );
  const tokenIsNotImported = !tokens.find(
    (token) =>
      token.address.toLowerCase() === selectedToken?.address.toLowerCase()
  );
  const [price, setPrice] = useState("0");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    if (selectedToken && user?.patchwallet && tokenIsNotImported) {
      getTokensPriceRequest(selectedToken.symbol, controller)
        .then((res) => {
          setPrice(
            (
              res.data?.data?.[selectedToken.symbol]?.[0]?.quote?.USD?.price ||
              0
            ).toString()
          );
        })
        .catch(() => {
          setPrice("0");
        });
    }

    return () => {
      controller.abort();
    };
  }, [tokenIsNotImported, user?.patchwallet, selectedToken]);

  return (
    <>
      <Box>
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
                "Select token out"
              )}
            </Button>
            {selectedToken && (
              <Token token={selectedToken}>
                <Typography
                  variant="xs"
                  sx={{ marginTop: "4px", lineHeight: 1.5 }}
                  color="hint"
                >
                  Balance: <TokenBalance format="eth" />
                </Typography>
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
                type: "number",
                min: 0,
                sx: {
                  padding: 0,
                  color: "var(--tg-theme-text-color, #000000)",
                },
                name: "amountOut",
              }}
              placeholder="0"
              disabled={swap.status === SwapStatus.LOADING}
              value={(
                parseFloat(swap.route?.amountOut || "0") /
                Math.pow(10, selectedToken?.decimals || 18)
              ).toString()}
              readOnly
            />

            {selectedToken && (
              <Typography variant="xs" color="hint">
                {(
                  parseFloat(tokenIsNotImported ? price : selectedToken.price) *
                  (parseFloat(swap.route?.amountOut || "0") /
                    Math.pow(10, selectedToken?.decimals || 18))
                ).toFixed(2)}{" "}
                USD
              </Typography>
            )}
          </Stack>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing="4px"
          sx={{
            marginTop: "16px",
            "& img": {
              display: "block",
              width: "100%",
              maxWidth: "75px",
              height: "auto",
            },
          }}
        >
          <Typography color="hint" variant="xs" textAlign="center">
            Powered by{" "}
          </Typography>
          <a href="https://www.enso.finance/" target="_blank" rel="noreferrer">
            <img
              src={`/images/partner-logos/enso/${
                isDarkTheme() ? "dark" : "light"
              }.png`}
              alt="Enso"
            />
          </a>
        </Stack>
      </Box>

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
          .filter((token) => token.address !== input.tokenIn)
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
                      tokenOut: itemProps.data[itemProps.index].address,
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

export default SwapTokensInputTokenOut;
