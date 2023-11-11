import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  InputBase,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../../store";
import TokensListItem from "../../TokensList/TokensListItem";
import SearchBox from "../../SearchBox/SearchBox";
import { TransitionProps } from "@mui/material/transitions";
import { SwapStatus } from "../../../../types/State";
import { FixedSizeList as List } from "react-window";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import { SwapTokensInputProps } from "./SwapTokensInput";
import { Token, TokenBalance, TokenIcon, TokenSymbol } from "../../Token";
import { getTokensPriceRequest } from "../../../../services/tokens";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SwapTokensInputTokenOut = ({ allTokens }: SwapTokensInputProps) => {
  const { height } = useWindowDimensions();
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const {
    user,
    swap,
    debug: { features },
    tokensNew,
  } = useAppSelector(selectAppStore);
  const { input } = swap;
  const [open, setOpen] = useState(false);
  const selectedToken = allTokens.find(
    (token) => token.address === input.tokenOut
  );
  const tokenIsNotImported = !tokensNew.find(
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

  return selectedToken ? (
    <>
      <Token token={selectedToken}>
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
              startIcon={<TokenIcon size={20} key={selectedToken.address} />}
              endIcon={<ArrowDropDownIcon />}
              sx={{
                padding: "2px 2px 2px 6px",
                marginLeft: "-4px",
                color: selectedToken
                  ? "var(--tg-theme-text-color, #000000)"
                  : undefined,
                borderRadius: "12px",
                "& .MuiButton-endIcon": {
                  marginLeft: "4px !important",
                },
              }}
            >
              <TokenSymbol />
            </Button>

            <Typography
              variant="xs"
              sx={{ marginTop: "4px", lineHeight: 1.5 }}
              color="hint"
            >
              Balance: <TokenBalance format="short" />
            </Typography>
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
            {features?.TOKEN_PRICE && (
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
      </Token>
      <Dialog
        TransitionComponent={Transition}
        fullScreen
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "0px",
            //width: "80%",
            //maxHeight: height - 100,
            background: "var(--tg-theme-bg-color, #ffffff)",
            //border: "1px solid var(--gr-theme-divider-color)",
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle
          sx={{
            padding: "12px",
          }}
        >
          <SearchBox
            placeholder="Search token"
            value={search}
            onChange={(value) => {
              setSearch(value);
            }}
            sx={{
              padding: "0",
            }}
          />
        </DialogTitle>
        <Divider sx={{ marginLeft: 0 }} />
        <DialogContent
          sx={{
            padding: "0",
          }}
        >
          <List
            height={height - 66}
            itemCount={
              (allTokens || [])
                .filter((token) =>
                  token.symbol.toLowerCase().includes(search.toLowerCase())
                )
                .filter((token) => token.address !== input.tokenIn).length
            }
            itemSize={48}
            width="100%"
            itemData={(allTokens || [])
              .filter((token) =>
                token.symbol.toLowerCase().includes(search.toLowerCase())
              )
              .filter((token) => token.address !== input.tokenIn)}
          >
            {(itemProps: { data: any; index: number; style: any }) => (
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
          </List>
        </DialogContent>
      </Dialog>
    </>
  ) : null;
};

export default SwapTokensInputTokenOut;
