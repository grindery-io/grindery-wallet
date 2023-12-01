import React from "react";
import { MoonPayBuyWidget, MoonPayProvider } from "@moonpay/moonpay-react";
import useBackButton from "hooks/useBackButton";
import { selectAppStore, useAppSelector } from "store";
//import { WALLET_API_URL } from "../../constants";
import { Box } from "@mui/material";
import { isDarkTheme } from "utils";

const BuyPage = () => {
  useBackButton();
  const { user } = useAppSelector(selectAppStore);

  /*const handleGetSignature = async (url: string): Promise<string> => {
    const res = await fetch(`${WALLET_API_URL}/v2/buy/sign-url?url=${url}`);
    const signature = await res.text();
    return signature;
  };*/

  return (
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
          width: "100%",
          height: "100vh",
          flex: 1,
          margin: "0 !important",
          padding: "0 16px !important",
          border: "none !important",
          borderRadius: "0 !important",
        },
        "& iframe": {
          width: "100%",
          height: "100vh",
          border: "none",
          display: "block",
          margin: 0,
          padding: 0,
        },
      }}
    >
      <MoonPayProvider
        apiKey="pk_test_relDpm1G9B54FAcIGvnGFlLLpH5hX"
        //environment="sandbox"
        debug
      >
        <MoonPayBuyWidget
          useWarnBeforeRefresh={false}
          variant="embedded"
          baseCurrencyCode="usd"
          baseCurrencyAmount="100"
          defaultCurrencyCode="eth"
          onLogin={async () => console.log("Customer logged in!")}
          visible
          colorCode={
            window.Telegram?.WebApp?.themeParams?.button_color || "#2481cc"
          }
          theme={isDarkTheme() ? "dark" : "light"}
          language="en"
          externalCustomerId={user?.userTelegramID}
          //walletAddress={user?.patchwallet}
          //onUrlSignatureRequested={handleGetSignature}
        />
      </MoonPayProvider>
    </Box>
  );
};

export default BuyPage;
