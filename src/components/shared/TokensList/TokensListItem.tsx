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
import { Token as TokenState } from "../../../types/State";
import { useNavigate } from "react-router";
import { getTokensPriceRequest } from "../../../services/tokens";
import Token, { TokenType } from "../Token/Token";
import TokenIcon from "../Token/TokenIcon/TokenIcon";
import TokenSymbol from "../Token/TokenSymbol/TokenSymbol";
import TokenBalance from "../Token/TokenBalance/TokenBalance";

type TokensListItemProps = {
  token: TokenState;
  onClick?: () => void;
  passive?: boolean;
};

const TokensListItem = ({ token, passive, onClick }: TokensListItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    user,
    balance: { value: balance },
    debug: { features },
  } = useAppSelector(selectAppStore);

  const formattedToken: TokenType = {
    name: token.name,
    symbol: token.symbol,
    decimals: token.decimals,
    address: token.address,
    icon: token.logoURI,
    chain: token.chainId.toString(),
    balance: ((token.balance || 0) * 10 ** token.decimals).toString(),
    price: (token.price || 0).toString(),
  };

  useEffect(() => {
    const controller = new AbortController();
    if (token.symbol !== "G1" && user?.patchwallet && !passive) {
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
    passive,
    dispatch,
  ]);

  useEffect(() => {
    const controller = new AbortController();
    if (!user?.patchwallet || passive || !features?.TOKEN_PRICE) {
      return;
    }
    if (token.symbol !== "G1") {
      dispatch(
        appStoreActions.setToken({
          id: token.id,
          priceLoading: true,
        })
      );
      getTokensPriceRequest(token.symbol, controller)
        .then((res) => {
          dispatch(
            appStoreActions.setToken({
              id: token.id,
              priceLoading: false,
              price:
                res.data?.data?.[token.symbol]?.[0]?.quote?.USD?.price || 0,
              priceUpdated:
                res.data?.data?.[token.symbol]?.[0]?.quote?.USD?.last_updated ||
                new Date().toString(),
            })
          );
        })
        .catch(() => {
          dispatch(
            appStoreActions.setToken({
              id: token.id,
              priceLoading: false,
            })
          );
        });
    } else {
      if (token.symbol === "G1") {
        dispatch(
          appStoreActions.setToken({
            id: token.id,
            price: 0,
            priceLoading: false,
            priceUpdated: new Date().toString(),
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
    passive,
    features?.TOKEN_PRICE,
    dispatch,
  ]);

  return (
    <Token token={formattedToken}>
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
                  navigate(`/tokens/${token.id}`);
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
