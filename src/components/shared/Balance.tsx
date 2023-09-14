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
        setBalance(res.data.balanceEther.toFixed(2));
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
        <h2 style={{ fontSize: "2.5em" }}>{balance || 0} G1</h2>
      ) : (
        <div>
          <p>
            You don't have a wallet yet. Use Grindery Ai Bot to create wallet.
            Link to Bot.
          </p>
        </div>
      )}
    </div>
  );
};

export default Balance;
