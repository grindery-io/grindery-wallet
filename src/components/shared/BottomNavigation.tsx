import React from "react";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { default as MuiBottomNavigation } from "@mui/material/BottomNavigation";
import { MAX_WIDTH } from "../../constants";
import { useLocation, useNavigate } from "react-router";
import TokensIcon from "../icons/TokensIcon";
import ContactsIcon from "../icons/ContactsIcon";
import NftsIcon from "../icons/NftsIcon";
import RewardsIcon from "../icons/RewardsIcon";
import ActivityIcon from "../icons/ActivityIcon";

const BottomNavigation = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const activeTab = location.pathname;

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
          borderTop: "1px solid rgb(220,220,220)",
          "& .MuiBottomNavigationAction-root": {
            minWidth: "auto",
            color: "#9DA1AE",
            "&.Mui-selected": {
              color: "#0B0C0E",
              position: "relative",
              "&::before": {
                content: '""',
                width: "100%",
                position: "absolute",
                top: "-1px",
                height: "2px",
                left: 0,
                display: "block",
                background: "#0B0C0E",
              },
            },
          },
          "& .MuiBottomNavigationAction-label": {
            marginTop: "3px",
            fontSize: "12px !important",
            fontFamily: "Geologica",
            color: "#9DA1AE",
            "&.Mui-selected": {
              color: "#0B0C0E",
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
          label="NFTs"
          value="/nfts"
          icon={<NftsIcon />}
        />
        <BottomNavigationAction
          label="Rewards"
          value="/rewards"
          icon={<RewardsIcon />}
        />
        <BottomNavigationAction
          label="Activity"
          value="/activity"
          icon={<ActivityIcon />}
        />
      </MuiBottomNavigation>
    </>
  );
};

export default BottomNavigation;
