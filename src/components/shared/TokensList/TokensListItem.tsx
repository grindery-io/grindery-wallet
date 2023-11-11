import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import { useNavigate } from "react-router";
import Token, { TokenType } from "../Token/Token";
import TokenIcon from "../Token/TokenIcon/TokenIcon";
import TokenSymbol from "../Token/TokenSymbol/TokenSymbol";
import TokenBalance from "../Token/TokenBalance/TokenBalance";

type TokensListItemProps = {
  token: TokenType;
  onClick?: () => void;
  passive?: boolean;
};

const TokensListItem = ({ token, onClick }: TokensListItemProps) => {
  const navigate = useNavigate();
  const {
    debug: { features },
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
                  navigate(`/tokens/${token.address}`);
                }
          }
        >
          <ListItemAvatar sx={{ minWidth: "42px" }}>
            <TokenIcon size={32} />
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
            {features?.TOKEN_PRICE && (
              <Typography variant="xs" color="hint" textAlign="right">
                <TokenBalance format="usd" /> USD
              </Typography>
            )}
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
