import { Box, Typography } from "@mui/material";
import React from "react";
import Title from "../Title";
import BulletPoints from "../BulletPoints";

type Props = {};

const ConnectTelegramDescription = (props: Props) => {
  return (
    <Box sx={{ maxWidth: "360px", margin: "0 auto" }}>
      <Box
        sx={{
          margin: "0 auto 24px",
          textAlign: "center",
          "& svg": {
            width: "60px",
            height: "60px",
          },
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1907_19935)">
            <path
              d="M24 -0.0917969C17.6362 -0.0917969 11.5275 2.43833 7.03125 6.93758C2.53125 11.4368 0 17.5456 0 23.9082C0 30.2708 2.53125 36.3796 7.03125 40.8788C11.5275 45.3781 17.6362 47.9082 24 47.9082C30.3638 47.9082 36.4725 45.3781 40.9688 40.8788C45.4688 36.3796 48 30.2708 48 23.9082C48 17.5456 45.4688 11.4368 40.9688 6.93758C36.4725 2.43833 30.3638 -0.0917969 24 -0.0917969Z"
              fill="url(#paint0_linear_1907_19935)"
            />
            <path
              d="M10.8638 23.6541C17.8613 20.6061 22.5262 18.5965 24.8587 17.6256C31.5262 14.8533 32.9099 14.3718 33.8137 14.3556C34.0124 14.3523 34.4549 14.4014 34.7437 14.635C34.9837 14.8319 35.0512 15.0981 35.085 15.2849C35.115 15.4716 35.1563 15.8973 35.1225 16.2295C34.7625 20.0245 33.1988 29.2338 32.4038 33.4844C32.07 35.283 31.4062 35.886 30.765 35.9448C29.37 36.0731 28.3124 35.0238 26.9624 34.1391C24.8512 32.7543 23.6587 31.8925 21.6075 30.5414C19.2375 28.9799 20.775 28.1215 22.125 26.719C22.4775 26.3519 28.6199 20.7663 28.7362 20.2596C28.7512 20.1963 28.7662 19.96 28.6237 19.8355C28.485 19.7106 28.2786 19.7534 28.1286 19.7871C27.9149 19.8351 24.5436 22.0656 18.0036 26.4783C17.0474 27.136 16.1811 27.4566 15.4011 27.4398C14.5461 27.4214 12.8962 26.9553 11.67 26.557C10.17 26.0684 8.97369 25.81 9.07869 24.9801C9.13119 24.5481 9.72753 24.106 10.8638 23.6541Z"
              fill="white"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_1907_19935"
              x1="24"
              y1="-0.0917969"
              x2="24"
              y2="47.9082"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2AABEE" />
              <stop offset="1" stopColor="#229ED9" />
            </linearGradient>
            <clipPath id="clip0_1907_19935">
              <rect width="48" height="48" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Box>
      <Title>Sign in with Telegram</Title>
      <Box>
        <Typography
          sx={{
            fontWeight: "300",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          Features you will get access to by signing in:
        </Typography>
        <BulletPoints
          items={[
            "Send crypto via contact names, not wallet addresses",
            "Spot unjoined network members, invite & earn rewards",
            "Receive alerts for new joiners & instantly trade tokens",
            "Access wallet both in and out of Telegram",
            "Explore even more features coming up",
          ]}
        />
      </Box>
    </Box>
  );
};

export default ConnectTelegramDescription;
