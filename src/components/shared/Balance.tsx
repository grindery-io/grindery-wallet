import React, { useCallback, useEffect } from "react";
import { CircularProgress } from "grindery-ui";
import useAppContext from "../../hooks/useAppContext";

type Props = {};

const Balance = (props: Props) => {
  const { userProps, checkingOptedIn } = useAppContext();
  const [loading, setLoading] = React.useState(false);
  const [balance, setBalance] = React.useState<number | null>(null);

  const getBalance = useCallback(async () => {
    if (!userProps.patchwallet_telegram || checkingOptedIn) {
      return;
    }
    // get balance here
    setBalance(100);
  }, [userProps.patchwallet_telegram, checkingOptedIn]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <div style={{ textAlign: "center", margin: "0 auto 40px" }}>
      {checkingOptedIn || (userProps.patchwallet_telegram && !balance) ? (
        <div style={{ textAlign: "center", margin: "0 auto 40px" }}>
          <CircularProgress />
        </div>
      ) : userProps.patchwallet_telegram ? (
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
