import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import Token, { TokenType } from "../../Token/Token";
import TokenIcon from "../../Token/TokenIcon/TokenIcon";
import TokenSymbol from "../../Token/TokenSymbol/TokenSymbol";
import TokenBalance from "../../Token/TokenBalance/TokenBalance";
import { selectAppStore, useAppSelector } from "store";
import TokenChain from "components/shared/Token/TokenChain/TokenChain";

type TokensListItemProps = {
  token: TokenType;
  onClick?: () => void;
  passive?: boolean;
  withChainIcon?: boolean;
};

const TokensListItem = ({
  token,
  onClick,
  withChainIcon,
}: TokensListItemProps) => {
  const navigate = useNavigate();
  const {
    debug: { enabled, features },
  } = useAppSelector(selectAppStore);

  return (
    <Token token={token}>
      <ListItem
        style={{
          ...TokensListItemStyles,
        }}
      >
        <ListItemButton
          sx={{ padding: "8px", borderRadius: "8px" }}
          onClick={
            typeof onClick !== "undefined"
              ? onClick
              : () => {
                  navigate(`/tokens/${token.chain}:${token.address}`);
                }
          }
        >
          <ListItemAvatar sx={{ minWidth: "42px", position: "relative" }}>
            <TokenIcon size={32} />
            {enabled && features?.MULTICHAIN && withChainIcon && (
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: "17px",
                  height: "17px",
                  position: "absolute",
                  bottom: "-3px",
                  left: "21px",
                  backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
                  borderRadius: "50%",
                }}
              >
                <TokenChain onlyIcon iconSize={13} />
              </Stack>
            )}
          </ListItemAvatar>
          <ListItemText
            primary={<TokenSymbol />}
            sx={{ marginRight: "100px" }}
            primaryTypographyProps={{
              sx: TokensListItemTextPrimaryTypographyStyles,
            }}
          />
          <ListItemSecondaryAction>
            <Typography textAlign="right" sx={{ whiteSpace: "nowrap" }}>
              <TokenBalance format="short" />
            </Typography>

            <Typography variant="xs" color="hint" textAlign="right">
              <TokenBalance format="usd" /> USD
            </Typography>
          </ListItemSecondaryAction>
        </ListItemButton>
      </ListItem>
    </Token>
  );
};

const TokensListItemStyles: React.CSSProperties = {
  padding: 0,
  margin: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "nowrap",
  flexDirection: "row",
  gap: "8px",
};

const TokensListItemTextPrimaryTypographyStyles = {
  lineHeight: 1.5,
  display: "-webkit-box",
  maxWidth: "100%",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export default TokensListItem;
