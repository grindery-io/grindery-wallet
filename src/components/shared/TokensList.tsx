import React from "react";
import { TOKENS } from "../../constants";
import { Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../store";

const TokensList = () => {
  const {
    balance: { value: balance },
  } = useAppSelector(selectAppStore);

  return (
    <ul
      style={{
        margin: "16px",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "stretch",
        justifyContent: "flex-start",
        width: "calc(100% - 32px)",
        flexWrap: "nowrap",
      }}
    >
      {TOKENS.map((token) => (
        <li
          key={token.symbol}
          style={{
            listStyleType: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "nowrap",
            flexDirection: "row",
            gap: "8px",
            opacity: token.disabled ? 0.35 : 1,
          }}
        >
          <img
            src={token.icon}
            alt=""
            style={{
              width: "32px",
              height: "32px",
              display: "block",
            }}
          />
          <Typography>{token.name}</Typography>
          <Typography sx={{ marginLeft: "auto" }}>
            {token.symbol === "G1" ? balance?.toLocaleString() : token.balance}{" "}
            {token.symbol}
          </Typography>
        </li>
      ))}
    </ul>
  );
};

export default TokensList;
