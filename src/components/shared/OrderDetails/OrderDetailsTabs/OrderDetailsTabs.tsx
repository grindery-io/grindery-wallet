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
  width: "calc(100% - 32px)",
  boxSizing: "border-box",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
  border: "none",
  margin: "16px 16px 0",
  "& .MuiTabs-scroller": {
    background: "var(--tg-theme-bg-color, #ffffff)",
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTab-root": {
    color: "var(--tg-theme-hint-color, #999999)",
    fontSize: "14px",
    fontFamily: "Geologica",
    minWidth: "70px",
    textTransform: "initial",
    fontWeight: "normal",
    borderBottom: "1px solid var(--gr-theme-divider-color)",
    "&.Mui-selected": {
      borderBottom: "1px solid var(--tg-theme-text-color, #000000)",
      boxShadow: "inset 0px -1px 0px var(--tg-theme-text-color, #000000)",
      color: "var(--tg-theme-text-color, #000000)",
      backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
    },
  },
};

export default OrderDetailsTabs;
