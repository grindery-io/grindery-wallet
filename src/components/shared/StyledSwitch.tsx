import { Switch, styled } from "@mui/material";

const StyledSwitch = styled(Switch)(({ theme }) => ({
  padding: "8px",
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "var(--tg-theme-button-color, #2481cc)",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "var(--tg-theme-link-color, #2481cc)",
    opacity: 1,
  },
  "& .MuiSwitch-track": {
    position: "relative",
    top: "0px",
    borderRadius: "16px",
    backgroundColor: "var(--tg-theme-hint-color, #999999)",
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: "18px",
    height: "18px",
    backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
  },
  "& .MuiSwitch-switchBase": {
    left: "1px",
  },
}));

export default StyledSwitch;
