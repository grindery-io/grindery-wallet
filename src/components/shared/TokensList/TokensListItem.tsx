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
              balance: res?.data?.balanceEther || 0,
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
          <img src={token.logoURI} alt="" style={TokensListItemImageStyles} />
        </ListItemAvatar>
        <ListItemText primary={token.name} />
        <ListItemSecondaryAction>
          <Typography>
            {(token.balance || 0).toLocaleString()} {token.symbol}
          </Typography>
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

const TokensListItemImageStyles: React.CSSProperties = {
  width: "32px",
  height: "32px",
  display: "block",
};

export default TokensListItem;
