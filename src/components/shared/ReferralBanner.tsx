import React, { useState } from "react";
import Banner from "./Banner/Banner";
import { BOT_URL } from "../../constants";
import { Box } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../store";

const ReferralBanner = () => {
  const { user } = useAppSelector(selectAppStore);
  const [visible, setVisible] = useState(true);

  return (
    <Banner
      visible={Boolean(user?.userTelegramID) && visible}
      onClose={() => {
        setVisible(false);
      }}
    >
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "4px",
          justifyContent: "flex-start",
          flexWrap: "nowrap",
        }}
        onClick={() => {
          navigator.clipboard.writeText(
            `${BOT_URL}?start=${user?.userTelegramID}`
          );
          setTimeout(() => {
            if (window.Telegram?.WebApp?.showAlert) {
              window.Telegram?.WebApp?.showAlert("Referral link copied");
            } else {
              window.alert("Referral link copied");
            }
          }, 250);
        }}
      >
        <strong>New referral system</strong>

        <span style={{ color: "var(--tg-theme-link-color, #2481cc)" }}>
          Get your referral link now!
        </span>
      </Box>
    </Banner>
  );
};

export default ReferralBanner;
