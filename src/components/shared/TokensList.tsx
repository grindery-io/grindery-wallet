import React from "react";
import { TOKENS } from "../../constants";
import useAppContext from "../../hooks/useAppContext";

const TokensList = () => {
  const {
    state: { balance },
  } = useAppContext();
  return (
    <ul
      style={{
        margin: "16px 0",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "stretch",
        justifyContent: "flex-start",
        width: "100%",
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

          <p
            style={{
              margin: 0,
              padding: 0,
              fontSize: "16px",
              lineHeight: 1.5,
              color: "var(--tg-theme-text-color, #000000)",
            }}
          >
            {token.name}
          </p>

          <p
            style={{
              color: "var(--tg-theme-text-color, #000000)",
              margin: "0 0 0 auto",
              padding: 0,
              fontSize: "16px",
              lineHeight: 1.5,
            }}
          >
            {token.symbol === "G1" ? balance?.toLocaleString() : token.balance}{" "}
            <span style={{ fontWeight: "normal" }}>{token.symbol}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default TokensList;
