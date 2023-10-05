import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import TokensList from "./TokensList";

const TokensTabs = () => {
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  return (
    <Box sx={{ width: "100%", padding: "16px", boxSizing: "border-box" }}>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          width: "100%",
          boxSizing: "border-box",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          border: "none",
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
              boxShadow:
                "inset 0px -1px 0px var(--tg-theme-text-color, #000000)",
              color: "var(--tg-theme-text-color, #000000)",
              backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
            },
          },
        }}
      >
        <Tab label="Tokens" />
        <Tab label="NFTs" />
      </Tabs>
      {tab === 0 && <TokensList />}
      {tab === 1 && (
        <div style={{ textAlign: "center", margin: "50px" }}>
          <Typography sx={{ color: "var(--tg-theme-hint-color, #999999)" }}>
            Coming soon
          </Typography>
        </div>
      )}
    </Box>
  );
};

export default TokensTabs;
