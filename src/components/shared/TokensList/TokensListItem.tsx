import React, { useEffect } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { getBalanceRequest } from "../../../services/balance";
import { Token } from "../../../types/State";
import { useNavigate } from "react-router";
import TokenIcon from "../TokenIcon";
import { formatBalance } from "../../../utils/formatBalance";

type TokensListItemProps = {
  token: Token;
};

const TokensListItem = ({ token }: TokensListItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    user,
    balance: { value: balance },
  } = useAppSelector(selectAppStore);

  useEffect(() => {
    const controller = new AbortController();
    if (token.symbol !== "G1" && user?.patchwallet) {
      dispatch(
        appStoreActions.setToken({
          id: token.id,
          loading: true,
        })
      );
      getBalanceRequest(user.patchwallet, token.address, "matic", controller)
        .then((res) => {
          dispatch(
            appStoreActions.setToken({
              id: token.id,
              balance: parseFloat(res?.data?.balanceEther) || 0,
              updated: new Date().toString(),
              loading: false,
              cached: false,
            })
          );
        })
        .catch(() => {
          dispatch(
            appStoreActions.setToken({
              id: token.id,
              loading: false,
              cached: true,
            })
          );
        });
    } else {
      if (token.symbol === "G1") {
        dispatch(
          appStoreActions.setToken({
            id: token.id,
            balance: balance,
            updated: new Date().toString(),
            loading: false,
            cached: false,
          })
        );
      }
    }

    return () => {
      controller.abort();
    };
  }, [
    token.id,
    token.symbol,
    token.address,
    user?.patchwallet,
    balance,
    dispatch,
  ]);

  return (
    <ListItem
      style={{
        ...TokensListItemStyles,
      }}
    >
      <ListItemButton
        sx={{ padding: "8px", borderRadius: "8px" }}
        onClick={() => {
          navigate(`/tokens/${token.id}`);
        }}
      >
        <ListItemAvatar sx={{ minWidth: "42px" }}>
          <TokenIcon url={token.logoURI} size={32} />
        </ListItemAvatar>
        <ListItemText
          primary={token.symbol}
          sx={{ marginRight: "100px" }}
          primaryTypographyProps={{
            sx: TokensListItemTextPrimaryTypographyStyles,
          }}
        />
        <ListItemSecondaryAction>
          <Typography>{formatBalance(token.balance || 0).formatted}</Typography>
        </ListItemSecondaryAction>
      </ListItemButton>
    </ListItem>
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
