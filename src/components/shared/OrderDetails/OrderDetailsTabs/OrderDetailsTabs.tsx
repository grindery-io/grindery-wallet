import React from "react";
import { Tab, Tabs } from "@mui/material";

type OrderDetailsTabsProps = {
  tab: number;
  onChange: (tab: number) => void;
};

const OrderDetailsTabs = ({ tab, onChange }: OrderDetailsTabsProps) => {
  const handleTabChange = (_: React.SyntheticEvent, newTab: number) => {
    onChange(newTab);
  };

  return (
    <>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={OrderDetailsTabsStyles}
      >
        <Tab label="Order Status" disableTouchRipple />
        <Tab label="Order Details" disableTouchRipple />
      </Tabs>
    </>
  );
};

const OrderDetailsTabsStyles = {
  width: "auto",
  boxSizing: "border-box",
  borderRadius: "50px",
  border: "none",
  margin: "16px auto 0",
  minHeight: "42px",
  backgroundColor: "var(--tg-theme-secondary-bg-color, #efeff3)",
  padding: "4px",
  "& .MuiTabs-scroller": {
    backgroundColor: "var(--tg-theme-secondary-bg-color, #efeff3)",
  },
  "& .MuiTabs-indicator": {
    height: "34px",
    borderRadius: "28px",
    backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
    zIndex: 1,
  },
  "& .MuiTab-root": {
    zIndex: 2,
    minHeight: "unset",
    height: "auto",
    borderRadius: "28px",
    color: "var(--tg-theme-text-color, #000000)",
    fontSize: "14px",
    fontFamily: "Geologica",
    minWidth: "unset",
    padding: "8px 16px",
    textTransform: "initial",
    fontWeight: "300",
    border: "none",
    backgroundColor: "transparent",
    whiteSpace: "nowrap",
    "&.Mui-selected": {
      border: "none",
      boxShadow: "none",
      color: "var(--tg-theme-text-color, #000000)",
      backgroundColor: "transparent",
    },
  },
};

export default OrderDetailsTabs;
