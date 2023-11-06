import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { Token } from "../../../types/State";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { useNavigate } from "react-router";

const TokensSearchListItem = ({ token }: { token: Token }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    tokens: { items },
  } = useAppSelector(selectAppStore);

  return (
    <ListItem sx={TokensSearchListItemStyles}>
      <ListItemButton
        onClick={() => {
          if (items.find((item: Token) => item.id === token.id)) {
            return;
          }
          dispatch(
            appStoreActions.setTokens({
              items: [...items, token],
            })
          );
          setTimeout(() => {
            navigate("/tokens");
          }, 150);
        }}
      >
        <ListItemAvatar sx={TokensSearchListItemAvatarStyles}>
          <object
            data={token.logoURI}
            type="image/png"
            style={{ borderRadius: "50%", width: "36px", height: "36px" }}
          >
            <img
              src="https://polygonscan.com/assets/poly/images/svg/empty-token.svg"
              style={{ width: "36px", height: "36px" }}
              alt=""
            />
          </object>
        </ListItemAvatar>
        <ListItemText
          sx={TokensSearchListItemTextStyles}
          primary={token.symbol}
          secondary={token.name}
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
            secondary={
              token.address.substring(0, 6) +
              "..." +
              token.address.substring(token.address.length - 4)
            }
            secondaryTypographyProps={{
              variant: "xs",
              color: "hint",
              sx: TokensSearchListItemTextSecondaryTypographyStyles,
            }}
          />
        </ListItemSecondaryAction>
      </ListItemButton>
    </ListItem>
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
  margin: "0 10px 0 0",
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
