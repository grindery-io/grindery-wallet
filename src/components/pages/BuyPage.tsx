import React from "react";
import { MoonPayBuyWidget, MoonPayProvider } from "@moonpay/moonpay-react";
import useBackButton from "hooks/useBackButton";
import { selectAppStore, useAppSelector } from "store";
import { WALLET_API_URL } from "../../constants";
import { Box } from "@mui/material";
import { isDarkTheme } from "utils";
import Loading from "components/shared/Loading/Loading";
import axios from "axios";

const BuyPage = () => {
  useBackButton();
  const { user } = useAppSelector(selectAppStore);

  const handleGetSignature = async (url: string): Promise<string> => {
    const res = await axios.get(
      `${WALLET_API_URL}/v2/buy/sign-url?url=${encodeURIComponent(url)}`,
      {
        headers: {
          Authorization: `Bearer ${window.Telegram?.WebApp?.initData}`,
        },
      }
    );

    return res.data?.signature || "";
  };

  return user?.patchwallet ? (
    <Box
      sx={{
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
      }}
    >
      <MoonPayProvider apiKey={process.env.REACT_APP_MOONPAY_PK || ""} debug>
        <MoonPayBuyWidget
          useWarnBeforeRefresh={false}
          variant="embedded"
          baseCurrencyCode="usd"
          baseCurrencyAmount="100"
          defaultCurrencyCode="eth"
          visible
          colorCode={
            window.Telegram?.WebApp?.themeParams?.button_color || "#2481cc"
          }
          theme={isDarkTheme() ? "dark" : "light"}
          language="en"
          externalCustomerId={user?.userTelegramID}
          walletAddress={user?.patchwallet}
          currencyCode="ETH_POLYGON"
          onUrlSignatureRequested={handleGetSignature}
        />
      </MoonPayProvider>
    </Box>
  ) : (
    <Loading />
  );
};

export default BuyPage;
