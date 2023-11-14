import React, { useState } from "react";
import Banner from "./Banner";
import { ButtonBase, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../store";
import PhonelinkLockOutlinedIcon from "@mui/icons-material/PhonelinkLockOutlined";

const AccountRecoveryBanner = () => {
  const { user } = useAppSelector(selectAppStore);

  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    window.Telegram?.WebApp.requestContact((res) => {
      console.log("requestContact res", res);
    });
  };

  return user &&
    !user.phoneNumber &&
    typeof window.Telegram?.WebApp.requestContact !== "undefined" ? (
    <Banner
      visible={visible}
      onClose={() => {
        setVisible(false);
      }}
    >
      <ButtonBase
        sx={{
          margin: "0 4px 0 0",
          color: "var(--tg-theme-link-color, #2481cc)",
        }}
        onClick={handleClick}
      >
        <PhonelinkLockOutlinedIcon sx={{ fontSize: "34px" }} />
      </ButtonBase>
      <ButtonBase
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "4px",
          justifyContent: "flex-start",
          flexWrap: "nowrap",
        }}
        onClick={handleClick}
      >
        <Typography
          variant="xs"
          sx={{ color: "var(--tg-theme-bg-color, #ffffff)" }}
        >
          <strong>Setup account recovery method!</strong>
        </Typography>

        <Typography
          variant="xs"
          sx={{ color: "var(--tg-theme-link-color, #2481cc)" }}
        >
          Share your phone number to setup account recovery method
        </Typography>
      </ButtonBase>
    </Banner>
  ) : null;
};

export default AccountRecoveryBanner;
