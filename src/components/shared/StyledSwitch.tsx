import { Switch, styled } from "@mui/material";

const StyledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "var(--tg-theme-button-color, #2481cc)",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "var(--tg-theme-hint-color, #999999)",
  },
  "& .MuiSwitch-track": {
    position: "relative",
    top: "1px",
  },
}));

export default StyledSwitch;
