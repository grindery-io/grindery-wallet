import React from "react";
import { Box, InputBase, Stack, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "store";
import { MAIN_TOKEN_ADDRESS } from "../../../../constants";
import { Token, TokenIcon, TokenSymbol } from "components/shared/Token";

type CovertTokensInputProps = {};

const CovertTokensInput = (props: CovertTokensInputProps) => {
  const { tokens } = useAppSelector(selectAppStore);
  const grinderyToken = tokens.find(
    (token) => token.address.toLowerCase() === MAIN_TOKEN_ADDRESS.toLowerCase()
  );

  return (
    <Box
      sx={{
        position: "relative",
        margin: "16px 16px 0",
        borderRadius: "16px",
        border: "1px solid var(--gr-theme-divider-color)",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing="16px"
        sx={{ padding: "16px 16px 12px", "& *": { lineHeight: "1.2" } }}
      >
        <Box>
          <Typography color="hint" mb="2px">
            <strong>You Exchange</strong>
          </Typography>
          <InputBase
            placeholder="0.00"
            sx={{ marginBottom: "2px" }}
            inputProps={{
              sx: {
                padding: 0,
                background: "transparent",
                color: "var(--tg-theme-text-color, #000000)",
                fontSize: "24px",
                lineHeight: "1",
                fontWeight: "600",
              },
            }}
          />
          <Typography
            variant="xs"
            color="hint"
            sx={{
              "& span": {
                textDecoration: "underline",
              },
            }}
          >
            Max: <span>3,500</span>
          </Typography>
        </Box>
        {grinderyToken && (
          <Box textAlign="right">
            <Token token={grinderyToken}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing="4px"
                mt="4px"
              >
                <TokenIcon size={20} />
                <Typography>
                  <strong>
                    <TokenSymbol />
                  </strong>
                </Typography>
              </Stack>
            </Token>
          </Box>
        )}
      </Stack>
      <Box
        sx={{
          width: "100%",
          height: "1px",
          background: "var(--gr-theme-divider-color)",
        }}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing="16px"
        sx={{ padding: "16px 16px 12px", "& *": { lineHeight: "1.2" } }}
      >
        <Box>
          <Typography color="hint" mb="2px">
            <strong>You add</strong>
          </Typography>
          <InputBase
            placeholder="0.00"
            sx={{ marginBottom: "2px" }}
            inputProps={{
              sx: {
                padding: 0,
                background: "transparent",
                color: "var(--tg-theme-text-color, #000000)",
                fontSize: "24px",
                lineHeight: "1",
                fontWeight: "600",
              },
            }}
          />
          <Typography variant="xs" color="hint">
            UST, USDC, MATIC, ...
          </Typography>
        </Box>

        <Box textAlign="right">
          <Typography mt="4px">
            <strong>USD</strong>
          </Typography>
        </Box>
      </Stack>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "var(--tg-theme-hint-color, #999999)",
          padding: "8px",
          backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
          border: "1px solid var(--gr-theme-divider-color)",
          borderRadius: "50%",
          zIndex: 2,
          "& svg": { display: "block" },
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <g clip-path="url(#clip0_2149_2951)">
            <path
              d="M3.514 12C2.81912 12.0004 2.13972 11.7948 1.56179 11.4089C0.983855 11.0231 0.53336 10.4746 0.267315 9.83262C0.00127056 9.19069 -0.0683652 8.48426 0.0672205 7.80273C0.202806 7.12121 0.537519 6.49523 1.029 6.004L3.1595 3.8705L3.867 4.5775L1.736 6.71C1.27525 7.18367 1.01952 7.81969 1.02413 8.48047C1.02875 9.14125 1.29334 9.77365 1.76065 10.2408C2.22797 10.708 2.86044 10.9724 3.52122 10.9769C4.182 10.9813 4.81796 10.7254 5.2915 10.2645L7.4225 8.1335L8.1295 8.8405L6 10.9715C5.67385 11.2983 5.28631 11.5574 4.85967 11.7339C4.43303 11.9104 3.97571 12.0009 3.514 12Z"
              fill="currentColor"
            />
            <path
              d="M8.84 8.13L8.133 7.423L10.264 5.292C10.6157 4.94047 10.8552 4.49255 10.9523 4.00489C11.0494 3.51723 10.9997 3.01172 10.8095 2.55231C10.6192 2.09289 10.2971 1.7002 9.88368 1.42389C9.47028 1.14758 8.98423 1.00007 8.487 1C8.15685 0.999088 7.8298 1.06367 7.52478 1.19C7.21975 1.31634 6.94282 1.50192 6.71 1.736L4.577 3.8675L3.87 3.16L6.0025 1.029C6.32799 0.701831 6.71511 0.442433 7.14148 0.26581C7.56785 0.0891867 8.025 -0.00115696 8.4865 3.40787e-06C9.18175 -0.000226645 9.86145 0.205819 10.4395 0.592059C11.0176 0.978299 11.4682 1.52737 11.7341 2.16977C12 2.81217 12.0693 3.51901 11.9333 4.20083C11.7973 4.88265 11.462 5.5088 10.97 6L8.84 8.13Z"
              fill="currentColor"
            />
            <path
              d="M7.42248 3.8709L3.87033 7.42305L4.57744 8.13016L8.12959 4.57801L7.42248 3.8709Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_2149_2951">
              <rect width="12" height="12" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Box>
    </Box>
  );
};

export default CovertTokensInput;
