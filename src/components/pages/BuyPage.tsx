import React, { useCallback, useEffect, useState } from "react";
import { loadMoonPay } from "@moonpay/moonpay-js";
import useBackButton from "../../hooks/useBackButton";
import Loading from "../shared/Loading/Loading";
import { Box } from "@mui/material";
import { selectAppStore, useAppSelector } from "store";

const BuyPage = () => {
  useBackButton();
  const [loading, setLoading] = useState(true);
  const { user } = useAppSelector(selectAppStore);

  const loadMoonpayWidget = useCallback(async () => {
    if (!user?.patchwallet || !user?.userTelegramID) {
      return;
    }
    const moonPay = await loadMoonPay();

    const widget = moonPay?.({
      flow: "buy",
      environment: "sandbox",
      variant: "embedded",
      containerNodeSelector: "#moonpay-container",
      useWarnBeforeRefresh: false,
      params: {
        apiKey: "pk_test_relDpm1G9B54FAcIGvnGFlLLpH5hX",
        walletAddress: user.patchwallet,
        colorCode:
          window.Telegram?.WebApp?.themeParams?.button_color || "#2481cc",
        theme: window.Telegram?.WebApp?.colorScheme || "light",
        language: "en",
        baseCurrencyCode: "usd",
        externalCustomerId: user.userTelegramID,
        redirectURL: "/buy/complete",
      },
      debug: true,
    });
    widget?.show();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [user?.patchwallet, user?.userTelegramID]);

  useEffect(() => {
    loadMoonpayWidget();
  }, [loadMoonpayWidget]);

  return (
    <Box
      sx={{
        position: "relative",
        flex: 1,
        width: "100%",
        height: "100vh",
        maxHeight: "100vh",
      }}
    >
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
          }}
        >
          <Loading />
        </Box>
      )}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          maxHeight: "100vh",
          "& iframe": {
            width: "100%",
            height: "100vh",
            maxHeight: "100vh",
            border: "none",
            padding: 0,
            margin: 0,
            display: "block",
          },
        }}
        id="moonpay-container"
      />
    </Box>
  );
};

export default BuyPage;
