import React from "react";
import { Box } from "@mui/material";
import ConvertTokensInputConvert from "./ConvertTokensInputConvert/ConvertTokensInputConvert";
import ConvertTokensInputAdd from "./ConvertTokensInputAdd/ConvertTokensInputAdd";
import AnchorIcon from "components/icons/AnchorIcon";

const ConvertTokensInput = () => {
  return (
    <Box sx={ConvertTokensInputStyles}>
      <ConvertTokensInputConvert />
      <Box sx={ConvertTokensInputDividerStyles} />
      <ConvertTokensInputAdd />
      <Box sx={ConvertTokensInputDividerIconStyles}>
        <AnchorIcon />
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
