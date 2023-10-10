import React, { useEffect, useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import { Box, CircularProgress, Typography } from "@mui/material";
import { formatBalance } from "../../utils/formatBalance";
import moment from "moment";
import RefreshIcon from "../icons/RefreshIcon";
import { useNavigate } from "react-router";

const Balance = () => {
  const {
    state: { user, balance, balanceCached, balanceUpdated, balanceLoading },
    getBalance,
  } = useAppContext();
  const navigate = useNavigate();
  const { full } = formatBalance(balance);
  const [clicked, setClicked] = useState(0);

  useEffect(() => {
    let timeout: any;
    if (clicked >= 10) {
      setClicked(0);
      navigate("/debug");
    } else if (clicked > 0) {
      timeout = setTimeout(() => {
        setClicked(0);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [clicked, navigate]);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "16px 16px 12px",
      }}
    >
      {!user ? (
        <Box sx={{ textAlign: "center", margin: "0 auto" }}>
          <CircularProgress
            sx={{ color: "var(--tg-theme-button-color, #2481cc)" }}
          />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              textAlign: "center",
              margin: "30px 0 26px",
              opacity: balanceCached ? 0.6 : 1,
            }}
          >
            <Typography
              component="span"
              variant="balance"
              onClick={() => {
                setClicked(clicked + 1);
              }}
              sx={{
                WebkitUserSelect: "none",
                userSelect: "none",
              }}
            >
              {full.toLocaleString()}{" "}
            </Typography>
            <Typography component="span" variant="md">
              G1
            </Typography>
            {balanceUpdated && (
              <Typography
                variant="xs"
                component="div"
                sx={{
                  fontWeight: "300",
                  minHeight: "24px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                }}
              >
                <Typography
                  variant="xs"
                  color="hint"
                  component="span"
                  sx={{ fontWeight: "inherit" }}
                >
                  Updated {moment(balanceUpdated).fromNow()}.{" "}
                </Typography>
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
                      display: "inline-flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0px",
                    }}
                  >
                    <Typography
                      component="span"
                      variant="xs"
                      color="hint"
                      sx={{
                        fontWeight: "inherit",
                        color: balanceLoading
                          ? "var(--tg-theme-hint-color, #999999)"
                          : "var(--tg-theme-link-color, #2481cc)",
                      }}
                    >
                      Refresh{balanceLoading && "ing"}
                    </Typography>
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
                          display: "block",
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
              </Typography>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Balance;
