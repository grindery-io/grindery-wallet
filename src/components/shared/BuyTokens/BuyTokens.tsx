import React from "react";
import { MoonPayBuyWidget, MoonPayProvider } from "@moonpay/moonpay-react";
import { selectAppStore, useAppSelector } from "store";
import { Box } from "@mui/material";
import { isDarkTheme } from "utils";
import { getMoonpaySignatureRequest } from "services";

const BuyTokens = () => {
  const { user } = useAppSelector(selectAppStore);
  const theme = isDarkTheme() ? "dark" : "light";
  const colorCode =
    window.Telegram?.WebApp?.themeParams?.button_color || "#2481cc";

  const handleGetSignature = async (url: string): Promise<string> => {
    const res = await getMoonpaySignatureRequest(url);

    return res.data?.signature || "";
  };

  return (
    <Box sx={BuyTokensStyles}>
      <MoonPayProvider apiKey={process.env.REACT_APP_MOONPAY_PK || ""} debug>
        <MoonPayBuyWidget
          useWarnBeforeRefresh={false}
          variant="embedded"
          baseCurrencyCode="usd"
          //baseCurrencyAmount="100"
          defaultCurrencyCode="eth"
          visible
          colorCode={colorCode}
          theme={theme}
          language="en"
          externalCustomerId={user?.userTelegramID || ""}
          walletAddress={user?.patchwallet || ""}
          currencyCode="ETH_POLYGON"
          onUrlSignatureRequested={handleGetSignature}
        />
      </MoonPayProvider>
    </Box>
  );
};

const BuyTokensStyles = {
  width: "100%",
  height: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "& > div": {
    width: "100% !important",
    height: "100vh !important",
    flex: 1,
    margin: "0 !important",
    padding: "0 !important",
    border: "none !important",
    borderRadius: "0 !important",
  },
  "& iframe": {
    width: "100% !important",
    height: "100vh !important",
    border: "none",
    display: "block",
    margin: 0,
    padding: 0,
  },
};

export default BuyTokens;
