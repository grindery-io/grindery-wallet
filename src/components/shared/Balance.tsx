import React, { useCallback, useEffect } from "react";
import { CircularProgress } from "grindery-ui";
import useAppContext from "../../hooks/useAppContext";
import axios from "axios";
import { BOT_API_URL } from "../../constants";

const Balance = () => {
  const {
    state: { user },
  } = useAppContext();
  const [balance, setBalance] = React.useState<number | null>(null);

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
        setBalance(parseFloat(res.data.balanceEther));
      } else {
        setBalance(0);
      }
    } catch (error) {
      setBalance(0);
    }
  }, [user]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <div style={{ textAlign: "center", margin: "0 auto 40px" }}>
      {!user ? (
        <div style={{ textAlign: "center", margin: "0 auto 40px" }}>
          <CircularProgress />
        </div>
      ) : user.patchwallet ? (
        <h2 style={{ fontSize: "2.5em" }}>{balance || 0} (g1)</h2>
      ) : (
        <div>
          <p>
            You don't have a wallet yet. Use{" "}
            <a href="https://telegram.me/grinderyAIBot" target="_blank">
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
