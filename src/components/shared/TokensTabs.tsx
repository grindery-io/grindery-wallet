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
            background: "var(--grindery-cool-grey-cool-grey-00, #fff)",
          },
          "& .MuiTabs-indicator": {
            display: "none",
          },
          "& .MuiTab-root": {
            color: "color: var(--grindery-cool-grey-cool-grey-100, #0B0C0E);",
            fontSize: "14px",
            fontFamily: "Geologica",
            minWidth: "70px",
            textTransform: "initial",
            fontWeight: "normal",
            borderBottom:
              "1px solid var(--grindery-cool-grey-cool-grey-10, #E3E3E8)",
            "&.Mui-selected": {
              borderBottom:
                "1px solid var(--grindery-cool-grey-cool-grey-100, #0B0C0E)",
              boxShadow:
                "inset 0px -1px 0px var(--grindery-cool-grey-cool-grey-100, #0B0C0E)",
              color: "inherit",
              backgroundColor:
                "var(--grindery-cool-grey-cool-grey-00, #F1F2F4)",
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
          <Typography color="GrayText">Coming soon</Typography>
        </div>
      )}
    </Box>
  );
};

export default TokensTabs;
