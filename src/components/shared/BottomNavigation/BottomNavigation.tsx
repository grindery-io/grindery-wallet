import React from "react";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { default as MuiBottomNavigation } from "@mui/material/BottomNavigation";
import { BOTTOM_TABS, MAX_WIDTH } from "../../../constants";
import { useLocation, useNavigate } from "react-router";
import TokensIcon from "../../icons/TokensIcon";
import ContactsIcon from "../../icons/ContactsIcon";
import RewardsIcon from "../../icons/RewardsIcon";
import CommunityIcon from "../../icons/CommunityIcon";
import AppsIcon from "../../icons/AppsIcon";
import { Box } from "@mui/material";

const BottomNavigation = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const activeTab =
    location.pathname === "/nfts" || location.pathname === "/activities"
      ? "/tokens"
      : location.pathname;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  const renderIcon = (label: string) => {
    switch (label) {
      case "Tokens":
        return <TokensIcon />;
      case "Contacts":
        return <ContactsIcon />;
      case "Rewards":
        return <RewardsIcon />;
      case "Apps":
        return <AppsIcon />;
      case "Community":
        return <CommunityIcon />;
      default:
        return <TokensIcon />;
    }
  };

  return (
    <>
      <Box sx={{ height: "20px" }} />
      <MuiBottomNavigation
        showLabels
        sx={BottomNavigationStyles}
        value={activeTab}
        onChange={handleChange}
        data-testid="bottom-navigation"
      >
        {BOTTOM_TABS.map((tab) => (
          <BottomNavigationAction
            key={tab.path}
            label={tab.label}
            value={tab.path}
            icon={renderIcon(tab.label)}
          />
        ))}
      </MuiBottomNavigation>
    </>
  );
};

const BottomNavigationStyles = {
  width: "100%",
  position: "fixed",
  zIndex: 2,
  bottom: 0,
  maxWidth: MAX_WIDTH,
  borderTop: "1px solid var(--gr-theme-divider-color)",
  background: "var(--tg-theme-bg-color, #ffffff)",
  "& .MuiBottomNavigationAction-root": {
    minWidth: "auto",
    color: "var(--tg-theme-hint-colorm, #999999)",
    "&.Mui-selected": {
      color: "var(--tg-theme-text-color, #000000)",
      position: "relative",
      "&::before": {
        content: '""',
        width: "100%",
        position: "absolute",
        top: "-1px",
        height: "2px",
        left: 0,
        display: "block",
        background: "var(--tg-theme-text-color, #000000)",
      },
    },
  },
  "& .MuiBottomNavigationAction-label": {
    marginTop: "3px",
    fontSize: "12px !important",
    fontFamily: "Geologica",
    color: "var(--tg-theme-hint-colorm, #999999)",
    "&.Mui-selected": {
      color: "var(--tg-theme-text-color, #000000)",
    },
  },
};

export default BottomNavigation;
