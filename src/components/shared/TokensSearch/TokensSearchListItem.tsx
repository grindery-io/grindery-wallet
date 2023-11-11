import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { useNavigate } from "react-router";
import Token, { TokenType } from "../Token/Token";
import TokenIcon from "../Token/TokenIcon/TokenIcon";
import TokenSymbol from "../Token/TokenSymbol/TokenSymbol";
import TokenName from "../Token/TokenName/TokenName";
import TokenAddress from "../Token/TokenAddress/TokenAddress";

const TokensSearchListItem = ({ token }: { token: TokenType }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { tokensNew } = useAppSelector(selectAppStore);

  return (
    <Token token={token}>
      <ListItem sx={TokensSearchListItemStyles}>
        <ListItemButton
          onClick={() => {
            dispatch(appStoreActions.setTokensNew([...tokensNew, token]));
            navigate("/tokens");
          }}
        >
          <ListItemAvatar sx={TokensSearchListItemAvatarStyles}>
            <TokenIcon size={36} />
          </ListItemAvatar>
          <ListItemText
            sx={TokensSearchListItemTextStyles}
            primary={<TokenSymbol />}
            secondary={<TokenName />}
            primaryTypographyProps={{
              variant: "xs",
              sx: TokensSearchListItemTextPrimaryTypographyStyles,
            }}
            secondaryTypographyProps={{
              variant: "xs",
              color: "hint",
              sx: TokensSearchListItemTextSecondaryTypographyStyles,
            }}
          />
          <ListItemSecondaryAction>
            <ListItemText
              secondary={<TokenAddress format="short" />}
              secondaryTypographyProps={{
                variant: "xs",
                color: "hint",
                sx: TokensSearchListItemTextSecondaryTypographyStyles,
              }}
            />
          </ListItemSecondaryAction>
        </ListItemButton>
      </ListItem>
    </Token>
  );
};

const TokensSearchListItemStyles = {
  margin: "10px 16px 0",
  width: "calc(100% - 32px)",
  padding: 0,
  backgroundColor: "transparent",
  border: "1px solid var(--gr-theme-divider-color)",
  borderRadius: "5px",
  overflow: "hidden",
};

const TokensSearchListItemAvatarStyles = {
  minWidth: "36px",
  marginRight: "10px",
  position: "relative",
  "& img": {
    display: "block",
  },
  "& > object": {
    display: "block",
  },
};

const TokensSearchListItemTextStyles = {
  margin: "0 90px 0 0",
};

const TokensSearchListItemTextPrimaryTypographyStyles = {
  lineHeight: 1.5,
  display: "-webkit-box",
  maxWidth: "100%",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const TokensSearchListItemTextSecondaryTypographyStyles = {
  lineHeight: 1.5,
  display: "-webkit-box",
  maxWidth: "100%",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export default TokensSearchListItem;
