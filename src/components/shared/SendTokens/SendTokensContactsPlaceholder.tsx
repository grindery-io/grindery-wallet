import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import Title from "../Title";
import BulletPoints from "../BulletPoints";

const SendTokensContactsPlaceholder = () => {
  const [connecting, setConnecting] = useState(false);

  return (
    <Box sx={{ padding: "12px 16px" }}>
      <Box sx={{ margin: "32px auto 24px" }}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="24" r="24" fill="#2AABEE" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.6004 24.0001C21.3342 24.0001 23.5504 21.7839 23.5504 19.0501C23.5504 16.3163 21.3342 14.1001 18.6004 14.1001C15.8666 14.1001 13.6504 16.3163 13.6504 19.0501C13.6504 21.7839 15.8666 24.0001 18.6004 24.0001Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.5 33.9003C10.5 29.4268 14.1265 25.8003 18.6 25.8003C23.0735 25.8003 26.7 29.4268 26.7 33.9003"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M30.8723 25.8002C33.109 25.8002 34.9223 23.9869 34.9223 21.7502C34.9223 19.5134 33.109 17.7002 30.8723 17.7002C28.6355 17.7002 26.8223 19.5134 26.8223 21.7502C26.8223 23.9869 28.6355 25.8002 30.8723 25.8002Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28.5752 27.6816C30.6091 26.932 32.8809 27.2238 34.6594 28.463C36.4379 29.7022 37.4984 31.7324 37.4996 33.9"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
      <Title>
        To select a recipient your wallet needs access to your contacts.
      </Title>

      <Button
        fullWidth
        disabled={connecting}
        onClick={() => {
          setConnecting(true);

          if (window.Telegram?.WebApp?.openLink) {
            window.Telegram.WebApp.openLink(
              `${
                window.location.protocol + "//" + window.location.host
              }/connect/telegram?${window.Telegram?.WebApp?.initData || ""}`
            );
          } else {
            window.open(
              `${
                window.location.protocol + "//" + window.location.host
              }/connect/telegram?${window.Telegram?.WebApp?.initData || ""}`
            );
          }
        }}
      >
        Grant Access
      </Button>
      <BulletPoints
        style={{
          marginTop: "24px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "inline-flex",
        }}
        items={[
          "Forget about wallet addresses of your contacts",
          "Send tokens before they setup they own wallet",
          "Earn rewards by identifying contacts to refer",
          "Explore your crypto network",
          "and more to come…",
        ]}
      />
    </Box>
  );
};

export default SendTokensContactsPlaceholder;
