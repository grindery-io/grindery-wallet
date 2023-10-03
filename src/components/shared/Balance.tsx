import React from "react";
import useAppContext from "../../hooks/useAppContext";
import { CircularProgress } from "@mui/material";
import Address from "./Address";
import { formatBalance } from "../../utils/formatBalance";
import moment from "moment";

const Balance = () => {
  const {
    state: { user, balance, balanceCached, balanceUpdated },
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
          <CircularProgress />
        </div>
      ) : (
        <>
          <h2
            style={{
              textAlign: "center",
              fontSize: "35px",
              margin: "30px 0 26px",
              opacity: balanceCached ? 0.6 : 1,
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
                  opacity: 0.6,
                }}
              >
                updated {moment(balanceUpdated).fromNow()}
              </div>
            )}
          </h2>

          <Address />
        </>
      )}
    </div>
  );
};

export default Balance;
