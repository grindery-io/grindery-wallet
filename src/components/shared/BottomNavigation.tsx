import React from "react";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { default as MuiBottomNavigation } from "@mui/material/BottomNavigation";
import { MAX_WIDTH } from "../../constants";
import { useLocation, useNavigate } from "react-router";
import TokensIcon from "../icons/TokensIcon";
import ContactsIcon from "../icons/ContactsIcon";
import ActivityIcon from "../icons/ActivityIcon";
import RewardsIcon from "../icons/RewardsIcon";
import CommunityIcon from "../icons/CommunityIcon";

const BottomNavigation = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const activeTab = location.pathname.includes("/activities")
    ? "/activities"
    : location.pathname;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <>
      <div style={{ height: "20px" }} />
      <MuiBottomNavigation
        showLabels
        sx={{
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
        }}
        value={activeTab}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Tokens"
          value="/"
          icon={<TokensIcon />}
        />
        <BottomNavigationAction
          label="Contacts"
          value="/contacts"
          icon={<ContactsIcon />}
        />
        <BottomNavigationAction
          label="Rewards"
          value="/rewards"
          icon={<RewardsIcon />}
        />
        <BottomNavigationAction
          label="Activity"
          value="/activities"
          icon={<ActivityIcon />}
        />
        <BottomNavigationAction
          label="Community"
          value="/community"
          icon={<CommunityIcon />}
        />
      </MuiBottomNavigation>
    </>
  );
};

export default BottomNavigation;
