import React, { useCallback, useEffect } from "react";
import { CircularProgress } from "grindery-ui";
import useAppContext from "../../hooks/useAppContext";
import axios from "axios";
import { BOT_API_URL } from "../../constants";

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
    <div style={{ textAlign: "center", margin: "0 auto" }}>
      {!user ? (
        <div style={{ textAlign: "center", margin: "0 auto" }}>
          <CircularProgress />
        </div>
      ) : user.patchwallet ? (
        <h2 style={{ fontSize: "2.5em", margin: 0 }}>
          {balance || 0} <span style={{ fontSize: "16px" }}>(g1)</span>
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
