import React, { useCallback, useEffect } from "react";
import useAppContext from "../../hooks/useAppContext";
import axios from "axios";
import { BOT_API_URL } from "../../constants";
import {
  CircularProgress,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

const Balance = () => {
  const {
    state: { user, balance },
    setState,
  } = useAppContext();

  const getBalance = useCallback(async () => {
    if (!user?.patchwallet) {
      return;
    }
    // get balance here
    try {
      const res = await axios.post(`${BOT_API_URL}/v1/data/balance/`, {
        userAddress: user.patchwallet,
        contractAddress: "0xe36BD65609c08Cd17b53520293523CF4560533d0",
        chainId: "matic",
      });
      if (res?.data?.balanceEther) {
        setState({ balance: parseFloat(res.data.balanceEther) });
      } else {
        setState({ balance: 0 });
      }
    } catch (error) {
      setState({ balance: 0 });
    }
  }, [user, setState]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "16px",
          flexWrap: "nowrap",
          margin: "0 0 40px",
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
              border: "none",
              "& .MuiSelect-select": {
                padding: "4px 8px",
                border: "none",
              },
              "& fieldset": {
                border: "none",
              },
            }}
            value="g1"
          >
            {["g1", "USD"].map((name) => (
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
      ) : user.patchwallet ? (
        <h2 style={{ textAlign: "center", fontSize: "30px", margin: "20px 0" }}>
          {balance || 0}{" "}
          <span style={{ fontWeight: "normal", fontSize: "16px" }}>(g1)</span>
        </h2>
      ) : (
        <div>
          <p style={{ textAlign: "center" }}>
            You don't have a wallet yet. Use{" "}
            <a
              href="https://telegram.me/grinderyAIBot"
              target="_blank"
              rel="noreferrer"
            >
              Grindery AI Bot
            </a>{" "}
            to create a wallet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Balance;
