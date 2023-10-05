import React from "react";
import useAppContext from "../../hooks/useAppContext";
import { Box, CircularProgress } from "@mui/material";
import { formatBalance } from "../../utils/formatBalance";
import moment from "moment";
import RefreshIcon from "../icons/RefreshIcon";

const Balance = () => {
  const {
    state: { user, balance, balanceCached, balanceUpdated, balanceLoading },
    getBalance,
  } = useAppContext();

  const { full } = formatBalance(balance);

  return (
    <div
      style={{
        width: "100%",
        padding: "16px 16px 12px",
        boxSizing: "border-box",
      }}
    >
      {!user ? (
        <div style={{ textAlign: "center", margin: "0 auto" }}>
          <CircularProgress
            sx={{ color: "var(--tg-theme-button-color, #2481cc)" }}
          />
        </div>
      ) : (
        <>
          <h2
            style={{
              textAlign: "center",
              fontSize: "35px",
              margin: "30px 0 26px",
              opacity: balanceCached ? 0.6 : 1,
              color: "var(--tg-theme-text-color, #000000)",
            }}
          >
            {full.toLocaleString()}{" "}
            <span style={{ fontWeight: "normal", fontSize: "16px" }}>G1</span>
            {balanceUpdated && (
              <div
                style={{
                  fontSize: "12px",
                  textAlign: "center",
                  fontWeight: "300",
                }}
              >
                <span style={{ color: "var(--tg-theme-hint-color, #999999)" }}>
                  Updated {moment(balanceUpdated).fromNow()}.{" "}
                </span>
                {moment(balanceUpdated) <
                  moment(new Date()).add(-1, "minute") && (
                  <button
                    onClick={() => {
                      getBalance(true);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      padding: "0",
                      margin: 0,
                      boxShadow: "none",
                      color: balanceLoading
                        ? "var(--tg-theme-hint-color, #999999)"
                        : "var(--tg-theme-link-color, #2481cc)",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    Refresh{balanceLoading && "ing"}
                    <Box
                      component="span"
                      sx={{
                        color: balanceLoading
                          ? "var(--tg-theme-hint-color, #999999)"
                          : "var(--tg-theme-link-color, #2481cc)",
                        padding: 0,
                        "& svg": {
                          WebkitAnimation: "spin 0.75s linear infinite",
                          MozAnimation: "spin 0.75s linear infinite",
                          animation: "spin 0.75s linear infinite",
                          animationPlayState: balanceLoading
                            ? "running"
                            : "paused",
                          width: "20px",
                          height: "20px",
                          position: "relative",
                          top: "5.5px",
                        },
                      }}
                    >
                      <RefreshIcon
                        sx={{
                          color: balanceLoading
                            ? "var(--tg-theme-hint-color, #999999)"
                            : "var(--tg-theme-link-color, #2481cc)",
                        }}
                      />
                    </Box>
                  </button>
                )}
              </div>
            )}
          </h2>
        </>
      )}
    </div>
  );
};

export default Balance;
