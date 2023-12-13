import React, { useState } from "react";
import { Box, Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "store";
import { CHAINS, CHAIN_EXPLORERS } from "../../../../constants";
import LinkIcon from "components/icons/LinkIcon";
import Chain from "components/shared/Chain/Chain";
import ChainAvatar from "components/shared/Chain/ChainAvatar/ChainAvatar";
import ChainName from "components/shared/Chain/ChainName/ChainName";

const TokensListExplorerButton = () => {
  const {
    user,
    debug: { enabled, features },
  } = useAppSelector(selectAppStore);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if ((enabled && features?.MULTICHAIN) || user?.optin_bridge) {
      setAnchorEl(event.currentTarget);
    } else {
      if (window.Telegram?.WebApp?.openLink) {
        window.Telegram.WebApp.openLink(
          `${CHAIN_EXPLORERS["137"]}/tokenholdings?a=${user?.patchwallet}`
        );
      } else {
        window.open(
          `${CHAIN_EXPLORERS["137"]}/tokenholdings?a=${user?.patchwallet}`,
          "_blank"
        );
      }
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ textAlign: "center" }} data-testid="tokens-explorer-button">
      <Button
        size="small"
        variant="text"
        color="primary"
        onClick={handleClick}
        sx={{ padding: "4px 16px" }}
      >
        See on Explorer
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiList-root": {
            padding: "8px 8px 4px",
          },
          "& .MuiMenuItem-root": {
            borderRadius: "4px",
            padding: "2px 12px !important",
            marginBottom: "4px",
            minHeight: "unset !important",
          },
          "& .MuiMenuItem-root.Mui-selected": {
            backgroundColor: "var(--tg-theme-button-color, #2481cc) !important",
            color: "var(--tg-theme-button-text-color, #ffffff) !important",
          },
        }}
      >
        {CHAINS.filter((chain) => CHAIN_EXPLORERS[chain.id]).map((chain) => (
          <MenuItem
            key={chain.id}
            onClick={() => {
              if (window.Telegram?.WebApp?.openLink) {
                window.Telegram.WebApp.openLink(
                  `${CHAIN_EXPLORERS[chain.id]}/tokenholdings?a=${
                    user?.patchwallet
                  }`
                );
              } else {
                window.open(
                  `${CHAIN_EXPLORERS[chain.id]}/tokenholdings?a=${
                    user?.patchwallet
                  }`,
                  "_blank"
                );
              }
              setTimeout(() => {
                handleClose();
              }, 500);
            }}
          >
            <Chain chain={chain}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                width="100%"
                spacing="8px"
                useFlexGap
              >
                <ChainAvatar size={20} />
                <Typography sx={{ marginRight: "8px" }}>
                  <ChainName />
                </Typography>
                <LinkIcon sx={{ marginLeft: "auto" }} />
              </Stack>
            </Chain>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default TokensListExplorerButton;
