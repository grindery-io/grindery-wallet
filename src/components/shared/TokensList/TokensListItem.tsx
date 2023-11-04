import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import { getBalanceRequest } from "../../../services/balance";
import { STORAGE_KEYS } from "../../../constants";

type TokensListItemProps = {
  token: {
    symbol: string;
    name: string;
    balance: string;
    icon: string;
    address: string;
    disabled?: boolean;
  };
};

const TokensListItem = ({ token }: TokensListItemProps) => {
  const {
    user,
    balance: { value: balance },
  } = useAppSelector(selectAppStore);

  const [tokenBalance, setTokenBalance] = React.useState<string>(
    token.symbol === "G1"
      ? balance?.toLocaleString() || "0"
      : localStorage.getItem(
          STORAGE_KEYS.TOKEN_BALANCE.replace("{{key}}", token.symbol)
        ) || "0"
  );

  useEffect(() => {
    const controller = new AbortController();
    if (token.symbol !== "G1" && user?.patchwallet) {
      getBalanceRequest(user.patchwallet, token.address, "matic", controller)
        .then((res) => {
          const value = res?.data?.balanceEther?.toLocaleString() || "0";
          setTokenBalance(value);
          localStorage.setItem(
            STORAGE_KEYS.TOKEN_BALANCE.replace("{{key}}", token.symbol),
            value
          );
        })
        .catch(() => {
          setTokenBalance("0");
        });
    } else {
      setTokenBalance(
        token.symbol === "G1" ? balance?.toLocaleString() || "0" : "0"
      );
    }

    return () => {
      controller.abort();
    };
  }, [token, user?.patchwallet, balance]);

  return (
    <li
      style={{
        ...TokensListItemStyles,
        opacity: token.disabled ? 0.35 : 1,
      }}
    >
      <img src={token.icon} alt="" style={TokensListItemImageStyles} />
      <Typography>{token.name}</Typography>
      <Typography ml="auto">
        {tokenBalance} {token.symbol}
      </Typography>
    </li>
  );
};

const TokensListItemStyles: React.CSSProperties = {
  listStyleType: "none",
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
