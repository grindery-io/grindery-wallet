import React, { useState } from "react";
import { Box, Button, Menu, MenuItem, SxProps } from "@mui/material";
import { CHAINS } from "../../../constants";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Chain, { ChainType } from "../Chain/Chain";
import ChainAvatar from "../Chain/ChainAvatar/ChainAvatar";
import ChainName from "../Chain/ChainName/ChainName";

export type TokensSearchChainSelectorProps = {
  selectedChain: ChainType;
  onChange: (chain: ChainType) => void;
  sx?: SxProps;
};

const TokensSearchChainSelector = ({
  selectedChain,
  onChange,
  sx,
}: TokensSearchChainSelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const chainSelectorOpen = Boolean(anchorEl);

  const handleChainSelectorOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChainSelectorClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        padding: "16px 16px 6px 0px",
        ...(sx || {}),
      }}
    >
      <Button
        sx={{ padding: "6px 2px", minWidth: "unset" }}
        variant="text"
        onClick={handleChainSelectorOpen}
      >
        <Chain chain={selectedChain}>
          <ChainAvatar size={27} />
        </Chain>
        <ArrowDropDownIcon
          sx={{ color: "var(--tg-theme-text-color, #000000)" }}
        />
      </Button>
      <Menu
        id="chain-menu"
        anchorEl={anchorEl}
        open={chainSelectorOpen}
        onClose={handleChainSelectorClose}
        MenuListProps={{
          sx: {
            background: "var(--tg-theme-secondary-bg-color, #efeff3)",
          },
        }}
      >
        {CHAINS.map((c) => (
          <MenuItem
            sx={{
              minHeight: "auto",
              "&.Mui-selected": {
                background:
                  "var(--tg-theme-secondary-bg-color, #efeff3) !important",
                color: "var(--tg-theme-link-color, #2481cc)",
              },
              borderRadius: "5px",
              margin: "2px 8px",
              padding: "6px 16px",
            }}
            key={c.id}
            selected={selectedChain.id === c.id}
            onClick={() => {
              onChange(c);
              handleChainSelectorClose();
            }}
          >
            <Chain chain={c}>
              <ChainAvatar size={20} sx={{ marginRight: "8px" }} />
              <ChainName />
            </Chain>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default TokensSearchChainSelector;
