import React, { useEffect } from "react";
import useBackButton from "hooks/useBackButton";
import { selectAppStore, useAppSelector } from "store";
import Loading from "components/shared/Loading/Loading";
import BuyTokens from "components/shared/BuyTokens/BuyTokens";

const alertMessage = `Buying tokens is working in a sandbox mode.\n\nNo real transactions will be made.\n\nDo not use real credit cards.`;

const BuyPage = () => {
  useBackButton();
  const { user } = useAppSelector(selectAppStore);

  useEffect(() => {
    if (process.env.REACT_APP_ENV !== "production") {
      if (window.Telegram?.WebApp?.showAlert) {
        window.Telegram?.WebApp?.showAlert(alertMessage);
      } else {
        window.alert(alertMessage);
      }
    }
  }, []);

  return user?.patchwallet ? <BuyTokens /> : <Loading />;
};

export default BuyPage;
