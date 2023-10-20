import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import TokensList from "./TokensList";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import ActivitiesList from "./ActivitiesList/ActivitiesList";

const TokensTabs = () => {
  const dispatch = useAppDispatch();
  const { tokensTab } = useAppSelector(selectAppStore);

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    dispatch(appStoreActions.setTokensTab(newTab));
  };

  return (
    <Box sx={{ width: "100%", padding: "16px 0", boxSizing: "border-box" }}>
      <Tabs
        value={tokensTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={TokensTabsStyles}
      >
        <Tab label="Tokens" disableTouchRipple />
        <Tab label="NFTs" disableTouchRipple />
        <Tab label="Activity" disableTouchRipple />
      </Tabs>
      {tokensTab === 0 && <TokensList />}
      {tokensTab === 1 && (
        <Box sx={{ textAlign: "center", margin: "50px" }}>
          <Typography sx={{ color: "var(--tg-theme-hint-color, #999999)" }}>
            Coming soon
          </Typography>
        </Box>
      )}
      {tokensTab === 2 && <ActivitiesList />}
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
