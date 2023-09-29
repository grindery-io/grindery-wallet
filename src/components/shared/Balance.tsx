import React from "react";
import useAppContext from "../../hooks/useAppContext";
import {
  CircularProgress,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Address from "./Address";
import { formatBalance } from "../../utils/formatBalance";

const Balance = () => {
  const {
    state: { user, balance, balanceCached },
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "16px",
          flexWrap: "nowrap",
          margin: "0 0 32px",
        }}
      >
        <p
          style={{
            margin: 0,
            padding: 0,
            textAlign: "left",
            opacity: 0.6,
          }}
        >
          Aggregated wallet balance
        </p>
        <div style={{ marginLeft: "auto" }}>
          <Select
            displayEmpty
            input={<OutlinedInput />}
            sx={{
              fontFamily: "Geologica",
              "& .MuiSelect-select": {
                padding: "4px 8px",
                border: "none",
              },
              "& fieldset": {
                borderRadius: "5px",
                border:
                  "1px solid var(--grindery-cool-grey-cool-grey-10, #E3E3E8)",
              },
            }}
            value="G1"
          >
            {["G1", "USD"].map((name) => (
              <MenuItem key={name} value={name} disabled={name === "USD"}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
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
              margin: "20px 0 16px",
              opacity: balanceCached ? 0.6 : 1,
            }}
          >
            {full.toLocaleString()}{" "}
            <span style={{ fontWeight: "normal", fontSize: "16px" }}>G1</span>
          </h2>
          <Address />
        </>
      )}
    </div>
  );
};

export default Balance;
