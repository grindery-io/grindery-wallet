import { createTheme } from "@mui/material";
import palette from "./palette";
import severity from "./severity";
import typography from "./typography";
import MuiTooltip from "./components/MuiTooltip";
import MuiButton from "./components/MuiButton";
import MuiTypography from "./components/MuiTypography";
import MuiDivider from "./components/MuiDivider";

declare module "@mui/material/styles" {
  interface Theme {}
  // allow configuration using `createTheme`
  interface ThemeOptions {
    severity?: typeof severity;
  }
}

const theme = createTheme({
  palette: palette,
  severity: severity,
  typography: typography,
  components: {
    MuiButton: MuiButton,
    MuiTooltip: MuiTooltip,
    MuiTypography: MuiTypography,
    MuiDivider: MuiDivider,
  },
});

export default theme;
