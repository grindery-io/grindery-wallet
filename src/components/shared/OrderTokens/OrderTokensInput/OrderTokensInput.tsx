import React from "react";
import { Box } from "@mui/material";
import OrderTokensInputConvert from "./OrderTokensInputConvert/OrderTokensInputConvert";
import OrderTokensInputAdd from "./OrderTokensInputAdd/OrderTokensInputAdd";

import AnchorIcon from "components/icons/AnchorIcon";

const OrderTokensInput = () => {
  return (
    <Box sx={OrderTokensInputStyles}>
      <OrderTokensInputConvert />
      <Box sx={OrderTokensInputDividerStyles} />
      <OrderTokensInputAdd />
      <Box sx={OrderTokensInputDividerIconStyles}>
        <AnchorIcon />
      </Box>
    </Box>
  );
};

const OrderTokensInputStyles = {
  position: "relative",
  margin: "16px 24px 0",
  borderRadius: "16px",
  border: "1px solid var(--gr-theme-divider-color)",
};

const OrderTokensInputDividerStyles = {
  width: "100%",
  height: "1px",
  background: "var(--gr-theme-divider-color)",
};

const OrderTokensInputDividerIconStyles = {
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

export default OrderTokensInput;
