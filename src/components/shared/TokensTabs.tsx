import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import TokensList from "./TokensList";
import ActivitiesList from "./ActivitiesList/ActivitiesList";
import { useLocation, useNavigate } from "react-router";
import { TOKENS_TABS } from "../../constants";

const TokensTabs = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleTabChange = (_: React.SyntheticEvent, newTab: number) => {
    navigate(TOKENS_TABS[newTab].path);
  };

  return (
    <Box sx={{ width: "100%", padding: "16px 0", boxSizing: "border-box" }}>
      <Tabs
        value={TOKENS_TABS.findIndex((tab) => tab.path === pathname)}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={TokensTabsStyles}
      >
        {TOKENS_TABS.map((tab) => (
          <Tab label={tab.label} disableTouchRipple key={tab.path} />
        ))}
      </Tabs>
      {pathname === "/tokens" && <TokensList />}
      {pathname === "/nfts" && (
        <Box sx={{ textAlign: "center", margin: "50px" }}>
          <Typography sx={{ color: "var(--tg-theme-hint-color, #999999)" }}>
            Coming soon
          </Typography>
        </Box>
      )}
      {pathname === "/activities" && <ActivitiesList />}
    </Box>
  );
};

const TokensTabsStyles = {
  width: "calc(100% - 32px)",
  boxSizing: "border-box",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
  border: "none",
  margin: "0 16px",
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

export default TokensTabs;
