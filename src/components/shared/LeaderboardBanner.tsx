import React, { useState } from "react";
import Banner from "./Banner";
import { ButtonBase, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { selectAppStore, useAppSelector } from "../../store";

const LeaderboardBanner = () => {
  const { user } = useAppSelector(selectAppStore);

  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  return user && user.telegramSession ? (
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
        onClick={() => {
          setTimeout(() => {
            navigate("/board");
          }, 250);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
        >
          <path
            d="M9.5625 32.9347V17C9.5625 12.8924 12.8924 9.5625 17 9.5625C21.1076 9.5625 24.4375 12.8924 24.4375 17V32.9375"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.1875 15.9346V18.0596H13.8125V15.9346C13.8125 14.761 14.7639 13.8096 15.9375 13.8096H18.0625C19.2361 13.8096 20.1875 14.761 20.1875 15.9346Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28.6875 27.8081C34.5654 21.468 34.3165 11.5978 28.1266 5.56199C21.9367 -0.473789 12.0633 -0.473789 5.87345 5.56199C-0.316436 11.5978 -0.565309 21.468 5.31253 27.8081"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
        onClick={() => {
          setTimeout(() => {
            navigate("/board");
          }, 250);
        }}
      >
        <Typography
          variant="xs"
          sx={{ color: "var(--tg-theme-bg-color, #ffffff)" }}
        >
          <strong>Checkout the leaderboard of Activity</strong>
        </Typography>

        <Typography
          variant="xs"
          sx={{ color: "var(--tg-theme-link-color, #2481cc)" }}
        >
          Rank and win an NFT!
        </Typography>
      </ButtonBase>
    </Banner>
  ) : null;
};

export default LeaderboardBanner;
