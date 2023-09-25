import React from "react";
import BottomNavigation from "../shared/BottomNavigation";
import useAppContext from "../../hooks/useAppContext";
import AppHeader from "../shared/AppHeader";
import Balance from "../shared/Balance";
import SendButton from "../shared/SendButton";

const tokens = [
  {
    symbol: "G1",
    name: "Grindery One",
    balance: "0",
    icon: "/images/g1-token-red.svg",
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

const TokensPage = () => {
  const {
    state: { user, balance, balanceLoading },
    getBalance,
  } = useAppContext();

  return (
    <>
      <AppHeader onRefresh={getBalance} refreshing={balanceLoading} />
      <>
        <Balance />
        <SendButton />
        <div
          style={{
            width: "100%",
            padding: "0 16px 16px",
            boxSizing: "border-box",
          }}
        >
          {user && (
            <>
              {/*<p
                style={{
                  margin: "0",
                  padding: "8px 0 16px",
                  textAlign: "left",
                  position: "sticky",
                  top: "61px",
                  background: "#fff",
                  zIndex: 1,
                }}
              >
                <span style={{ opacity: 0.6 }}>Rewards</span>
              </p>
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
                <li
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
                  }}
                >
                  <img
                    src={tokens[0].icon}
                    alt=""
                    style={{ width: "32px", height: "32px", display: "block" }}
                  />

                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: "16px",
                      lineHeight: 1.5,
                      color: "var(--grindery-cool-grey-cool-grey-70, #4F5563)",
                    }}
                  >
                    {tokens[0].name}
                  </p>

                  <p
                    style={{
                      color: "var(--grindery-cool-grey-cool-grey-100, #0B0C0E)",
                      margin: "0 0 0 auto",
                      padding: 0,
                      fontSize: "16px",
                      lineHeight: 1.5,
                    }}
                  >
                    {rewards
                      .map((reward) => parseFloat(reward.amount))
                      .reduce((partialSum, a) => partialSum + a, 0)}{" "}
                    <span style={{ fontWeight: "normal" }}>
                      {tokens[0].symbol}
                    </span>
                  </p>
                </li>
                    </ul>*/}
              <p
                style={{
                  margin: "0",
                  padding: "8px 0 16px",
                  textAlign: "left",
                  position: "sticky",
                  top: "61px",
                  background: "#fff",
                  zIndex: 1,
                }}
              >
                <span style={{ opacity: 0.6 }}>Tokens</span>
              </p>
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
                        color:
                          "var(--grindery-cool-grey-cool-grey-70, #4F5563)",
                      }}
                    >
                      {token.name}
                    </p>

                    <p
                      style={{
                        color:
                          "var(--grindery-cool-grey-cool-grey-100, #0B0C0E)",
                        margin: "0 0 0 auto",
                        padding: 0,
                        fontSize: "16px",
                        lineHeight: 1.5,
                      }}
                    >
                      {token.symbol === "G1"
                        ? balance?.toString()
                        : token.balance}{" "}
                      <span style={{ fontWeight: "normal" }}>
                        {token.symbol}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </>

      <BottomNavigation />
    </>
  );
};

export default TokensPage;
