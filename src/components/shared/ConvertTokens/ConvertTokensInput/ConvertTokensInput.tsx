import React from "react";
import { Box } from "@mui/material";
import ConvertTokensInputConvert from "./ConvertTokensInputConvert/ConvertTokensInputConvert";
import ConvertTokensInputAdd from "./ConvertTokensInputAdd/ConvertTokensInputAdd";

const ConvertTokensInput = () => {
  return (
    <Box sx={ConvertTokensInputStyles}>
      <ConvertTokensInputConvert />
      <Box sx={ConvertTokensInputDividerStyles} />
      <ConvertTokensInputAdd />
      <Box sx={ConvertTokensInputDividerIconStyles}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <g clipPath="url(#clip0_2283_4525)">
            <path
              d="M12 5.5H6.5V0H5.5V5.5H0V6.5H5.5V12H6.5V6.5H12V5.5Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_2283_4525">
              <rect width="12" height="12" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Box>
    </Box>
  );
};

const ConvertTokensInputStyles = {
  position: "relative",
  margin: "16px 24px 0",
  borderRadius: "16px",
  border: "1px solid var(--gr-theme-divider-color)",
};

const ConvertTokensInputDividerStyles = {
  width: "100%",
  height: "1px",
  background: "var(--gr-theme-divider-color)",
};

const ConvertTokensInputDividerIconStyles = {
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
};

export default ConvertTokensInput;
