import { PaletteMode } from "@mui/material";
import { isDarkTheme } from "../utils/isDarkTheme";

const palette = {
  mode: isDarkTheme() ? ("dark" as PaletteMode) : undefined,
  primary: {
    main: "#8C30F5",
  },
  secondary: {
    main: "#0B0D17",
  },
};

export default palette;
