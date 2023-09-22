import React from "react";
import Address from "./Address";
import Balance from "./Balance";
import SendButton from "./SendButton";
import useAppContext from "../../hooks/useAppContext";

const tokens = [
  {
    symbol: "g1",
    name: "Grindery One",
    balance: "0",
    icon: "https://app.grindery.io/logo192.png",
  },
  {
    symbol: "MATIC",
    name: "Polygon Matic",
    balance: "0",
    icon: "https://polygonscan.com/images/svg/brands/matic.svg",
    disabled: true,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: "0",
    icon: "https://polygonscan.com/token/images/centre-usdc_32.png",
    disabled: true,
  },
];

const Tokens = () => {
  const {
    state: { user, balance },
  } = useAppContext();
  return (
    <>
      <div />
      <Balance />
      <Address />
      <SendButton />
      <div style={{ width: "100%" }}>
        <p
          style={{
            margin: "0",
            padding: "16px 0",
            textAlign: "left",
            position: "sticky",
            top: "0px",
            background: "#fff",
            zIndex: 1,
          }}
        >
          <span style={{ opacity: 0.6 }}>Tokens</span>
        </p>
        {user && (
          <ul
            style={{
              margin: "0 0 20px",
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
            {tokens.map((token) => (
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
                  style={{ width: "32px", height: "32px", display: "block" }}
                />
                <div>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: "14px",
                      lineHeight: 1.5,
                    }}
                  >
                    {token.name}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: "14px",
                      lineHeight: 1.5,
                      fontWeight: "bold",
                    }}
                  >
                    {token.symbol === "g1"
                      ? balance?.toString()
                      : token.balance}{" "}
                    <span style={{ fontWeight: "normal" }}>{token.symbol}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Tokens;
