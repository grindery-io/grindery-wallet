import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, ListItemButton, Stack, Typography } from "@mui/material";
import DialogSelect from "components/shared/DialogSelect/DialogSelect";
import TokensListItem from "components/shared/TokensList/TokensListItem/TokensListItem";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";
import {
  Token,
  TokenBalance,
  TokenChain,
  TokenIcon,
  TokenSymbol,
} from "components/shared/Token";
import { CHAINS } from "../../../../constants";

const SendTokensInputToken = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const {
    user,
    tokens,
    send: { input },
    debug: { enabled, features },
  } = useAppSelector(selectAppStore);
  const { chainId, tokenAddress } = input;
  const selectedToken = tokens.find(
    (token) =>
      token.address.toLowerCase() === tokenAddress?.toLowerCase() &&
      token.chain === chainId
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return selectedToken ? (
    <Token token={selectedToken}>
      <ListItemButton
        onClick={handleOpen}
        sx={{
          width: "100%",
          borderRadius: "10px",
          border: "none",
          background: "var(--tg-theme-secondary-bg-color, #efeff3)",
          padding: "10px 10px 10px 20px",
          flex: "unset",
          "&.Mui-disabled": {
            opacity: 1,
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing="16px"
          useFlexGap
          sx={{
            width: "100%",
          }}
        >
          <Box sx={{ position: "relative", width: "36px", height: "36px" }}>
            <TokenIcon size={36} />

            {((enabled && features?.MULTICHAIN) || user?.optin_bridge) && (
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  position: "absolute",
                  bottom: "-2px",
                  right: "-2px",
                  width: "17px",
                  height: "17px",
                  backgroundColor:
                    "var(--tg-theme-secondary-bg-color, #efeff3)",
                  borderRadius: "50%",
                }}
              >
                <TokenChain onlyIcon iconSize={13} />
              </Stack>
            )}
          </Box>
          <Box>
            <Typography variant="sm" sx={{ lineHeight: 1.5 }}>
              <TokenSymbol />{" "}
              <span style={{ color: "var(--tg-theme-hint-color, #999999)" }}>
                on <TokenChain /> blockchain
              </span>
            </Typography>
            <Typography variant="xs" sx={{ lineHeight: 1.5 }} color="hint">
              Balance: <TokenBalance format="eth" />
            </Typography>
          </Box>

          <Box
            sx={{
              padding: "0 4px",
              marginLeft: "auto",
            }}
          >
            <ArrowDropDownIcon
              sx={{
                display: "block",
                color: "var(--tg-theme-hint-color, #999999)",
              }}
            />
          </Box>
        </Stack>
      </ListItemButton>
      <DialogSelect
        open={open}
        onClose={handleClose}
        search={{
          value: search,
          onChange: setSearch,
        }}
        items={tokens
          .filter((token) =>
            token.symbol.toLowerCase().includes(search.toLowerCase())
          )
          .filter((token) => {
            if (
              token.address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
            ) {
              return false;
            }
            if (
              !features?.MULTICHAIN &&
              !user?.optin_bridge &&
              token.chain !== "137"
            ) {
              return false;
            }
            if (!CHAINS.map((c) => c.id).includes(token.chain)) {
              return false;
            }
            return true;
          })}
        itemSize={48}
        item={(itemProps: { data: any; index: number; style: any }) => (
          <Box
            sx={{ ...itemProps.style, padding: "0 8px" }}
            key={itemProps.data[itemProps.index].id}
          >
            <TokensListItem
              withChainIcon
              key={itemProps.data[itemProps.index].address}
              passive
              token={itemProps.data[itemProps.index]}
              onClick={() => {
                dispatch(
                  appStoreActions.setSend({
                    input: {
                      ...input,
                      tokenAddress: itemProps.data[itemProps.index].address,
                      chainId: itemProps.data[itemProps.index].chain,
                    },
                  })
                );
                handleClose();
              }}
            />
          </Box>
        )}
      />
    </Token>
  ) : null;
};

export default SendTokensInputToken;
