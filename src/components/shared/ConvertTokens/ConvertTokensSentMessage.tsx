import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import UserAddress from "../UserAddress";
import { selectAppStore, useAppSelector } from "store";

const ConvertTokensSentMessage = () => {
  const {
    convert: { input, result },
  } = useAppSelector(selectAppStore);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          "& img": {
            width: "100%",
            height: "auto",
            display: "block",
            maxWidth: "100%",
          },
        }}
      >
        <img src="/images/convert-tokens-success.png" alt="" />
      </Box>
      <Stack
        direction="column"
        alignItems="stretch"
        justifyContent="flex-start"
        spacing="16px"
        useFlexGap
        sx={{
          width: "calc(100% - 32px)",
          margin: "16px 16px",
          "& ul": {
            padding: "0",
            margin: "0",
            "& li": {
              color: "var(--tg-theme-text-color, #000000)",
              listStyleType: "disc",
              fontWeight: "bold",
              fontSize: "14px",
              lineHeight: "1.5",
              padding: 0,
              marginLeft: "16px",
            },
          },
        }}
      >
        <Typography variant="sm" textAlign="center">
          <strong>Order ID: 123123</strong>
        </Typography>
        <Typography variant="title" sx={{ lineHeight: 1.1 }}>
          <strong>Your pre-order of GX Tokens has been confirmed!</strong>
        </Typography>
        <Stack direction="column" alignItems="stretch" spacing="8px">
          <Stack direction="row" alignItems="center" spacing="6px">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle cx="8" cy="8" r="8" fill="#00B674" />
              <path
                d="M6.59946 11.1414C6.48801 11.1414 6.37764 11.1195 6.27468 11.0768C6.17173 11.0342 6.0782 10.9716 5.99946 10.8927L4.18546 9.07939C4.09172 8.98562 4.03906 8.85847 4.03906 8.72589C4.03906 8.5933 4.09172 8.46615 4.18546 8.37239C4.27922 8.27865 4.40637 8.22599 4.53896 8.22599C4.67154 8.22599 4.79869 8.27865 4.89246 8.37239L6.59946 10.0794L11.1155 5.56339C11.2092 5.46965 11.3364 5.41699 11.469 5.41699C11.6015 5.41699 11.7287 5.46965 11.8225 5.56339C11.9162 5.65715 11.9688 5.7843 11.9688 5.91689C11.9688 6.04947 11.9162 6.17662 11.8225 6.27039L7.19946 10.8927C7.12071 10.9716 7.02718 11.0342 6.92423 11.0768C6.82127 11.1195 6.71091 11.1414 6.59946 11.1414Z"
                fill="white"
              />
            </svg>
            <Typography variant="sm">
              <strong>{result} GX preordered</strong>
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing="6px">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle cx="8" cy="8" r="8" fill="#00B674" />
              <path
                d="M6.59946 11.1414C6.48801 11.1414 6.37764 11.1195 6.27468 11.0768C6.17173 11.0342 6.0782 10.9716 5.99946 10.8927L4.18546 9.07939C4.09172 8.98562 4.03906 8.85847 4.03906 8.72589C4.03906 8.5933 4.09172 8.46615 4.18546 8.37239C4.27922 8.27865 4.40637 8.22599 4.53896 8.22599C4.67154 8.22599 4.79869 8.27865 4.89246 8.37239L6.59946 10.0794L11.1155 5.56339C11.2092 5.46965 11.3364 5.41699 11.469 5.41699C11.6015 5.41699 11.7287 5.46965 11.8225 5.56339C11.9162 5.65715 11.9688 5.7843 11.9688 5.91689C11.9688 6.04947 11.9162 6.17662 11.8225 6.27039L7.19946 10.8927C7.12071 10.9716 7.02718 11.0342 6.92423 11.0768C6.82127 11.1195 6.71091 11.1414 6.59946 11.1414Z"
                fill="white"
              />
            </svg>
            <Typography variant="sm">
              <strong>{input.convert} G1 exchanged</strong>
            </Typography>
          </Stack>
          {parseFloat(input.add) > 0 && (
            <Stack direction="row" alignItems="center" spacing="6px">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clipPath="url(#clip0_2281_419)">
                  <circle cx="8" cy="8" r="8" fill="#FFB930" />
                  <path
                    d="M7.33398 3.99967C7.33398 3.82286 7.40422 3.65329 7.52925 3.52827C7.65427 3.40325 7.82384 3.33301 8.00065 3.33301C8.17746 3.33301 8.34703 3.40325 8.47206 3.52827C8.59708 3.65329 8.66732 3.82286 8.66732 3.99967V9.33301C8.66732 9.50982 8.59708 9.67939 8.47206 9.80441C8.34703 9.92944 8.17746 9.99967 8.00065 9.99967C7.82384 9.99967 7.65427 9.92944 7.52925 9.80441C7.40422 9.67939 7.33398 9.50982 7.33398 9.33301V3.99967ZM8.00065 11.9997C8.13251 11.9997 8.2614 12.0388 8.37103 12.112C8.48066 12.1853 8.56611 12.2894 8.61657 12.4112C8.66703 12.533 8.68023 12.6671 8.65451 12.7964C8.62878 12.9257 8.56529 13.0445 8.47206 13.1377C8.37882 13.231 8.26003 13.2945 8.13071 13.3202C8.00139 13.3459 7.86735 13.3327 7.74553 13.2823C7.62371 13.2318 7.51959 13.1464 7.44634 13.0367C7.37308 12.9271 7.33398 12.7982 7.33398 12.6663C7.33398 12.4895 7.40422 12.32 7.52925 12.1949C7.65427 12.0699 7.82384 11.9997 8.00065 11.9997Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2281_419">
                    <rect width="16" height="16" rx="8" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <Typography variant="sm">
                <strong>{input.add} USD pending*</strong>
              </Typography>
            </Stack>
          )}
        </Stack>
        {parseFloat(input.add) > 0 && (
          <>
            <Typography color="hint" variant="sm" fontWeight="300">
              * Your wallet will be charged {input.add} USD on 20.12.2023.
              Please make sure that your wallet holds at least {input.add} USD
              or the transaction will not go through.
            </Typography>
            <Typography color="hint" variant="sm" fontWeight="300">
              Please make sure to deposit in your wallet{" "}
              <Box sx={{ "& > div": { textAlign: "left", marginTop: "2px" } }}>
                <UserAddress
                  border={false}
                  avatar={false}
                  link={false}
                  sx={{
                    gap: "6px",
                    marginTop: "4px",
                    textAlign: "left",
                    color: "var(--gr-theme-color-secondary, #ea5230)",
                    "& *": {
                      color:
                        "var(--gr-theme-color-secondary, #ea5230) !important",
                    },
                    padding: "2px 8px",
                    background: "#F8E3DE",
                    borderRadius: "32px",
                  }}
                />
              </Box>
            </Typography>
          </>
        )}
        <Typography
          color="hint"
          variant="sm"
          fontWeight="300"
          sx={{
            "& a": {
              color: "var(--gr-theme-color-secondary, #ea5230)",
              textDecoration: "underline",
              fontWeight: "bold",
              "&:hover": {
                color: "var(--gr-theme-color-secondary, #ea5230)",
                textDecoration: "none",
              },
            },
          }}
        >
          More technical details on the token sale{" "}
          <a href="https://www.grindery.io">here</a>.
        </Typography>
      </Stack>
    </Box>
  );
};

export default ConvertTokensSentMessage;
