import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  InputBase,
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
import TokenIcon from "../../TokenIcon";
import TokensListItem from "../../TokensList/TokensListItem";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import { MAIN_TOKEN_ADDRESS } from "../../../../constants";
import SearchBox from "../../SearchBox/SearchBox";

const SwapTokensInputTokenIn = () => {
  const { height } = useWindowDimensions();
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const {
    swap: { input },
    tokens,
  } = useAppSelector(selectAppStore);
  const [open, setOpen] = useState(false);
  const selectedToken = tokens.items.find(
    (token) => token.address === input.tokenIn
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      spacing="16px"
      useFlexGap
      sx={{
        padding: "10px 20px",
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
              <TokenIcon url={selectedToken.logoURI} size={20} />
            ) : undefined
          }
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
          {selectedToken?.symbol || "Select a token"}
        </Button>
        <Dialog
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: "10px",
              width: "80%",
              maxHeight: height - 100,
              background: "var(--tg-theme-bg-color, #ffffff)",
              border: "1px solid var(--gr-theme-divider-color)",
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
              padding: "12px 8px",
            }}
          >
            {tokens.items
              .filter((token) => token.address !== MAIN_TOKEN_ADDRESS)
              .filter((token) => token.address !== input.tokenOut)
              .filter((token) =>
                token.symbol.toLowerCase().includes(search.toLowerCase())
              )
              .map((token) => (
                <TokensListItem
                  key={token.address}
                  passive
                  token={token}
                  onClick={() => {
                    dispatch(
                      appStoreActions.setSwap({
                        input: {
                          ...input,
                          tokenIn: token.address,
                        },
                      })
                    );
                    handleClose();
                  }}
                />
              ))}
          </DialogContent>
        </Dialog>
        <Typography
          variant="xs"
          sx={{ marginTop: "4px", lineHeight: 1.5 }}
          color="hint"
        >
          Balance: {selectedToken?.balance || 0}
        </Typography>
      </Box>
      <Stack
        sx={{ marginLeft: "auto" }}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing="10px"
      >
        <InputBase
          sx={{
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
            name: "amountIn",
          }}
          placeholder="0"
          value={input.amountIn}
          onChange={(e) => {
            dispatch(
              appStoreActions.setSwap({
                input: {
                  ...input,
                  amountIn: e.target.value,
                },
              })
            );
          }}
        />
      </Stack>
    </Stack>
  );
};

export default SwapTokensInputTokenIn;
