import { createTheme } from "@mui/material";
import palette from "./palette";
import severity from "./severity";
import typography from "./typography";
import MuiTooltip from "./components/MuiTooltip";
import MuiButton from "./components/MuiButton";
import MuiDivider from "./components/MuiDivider";

declare module "@mui/material/styles" {
  interface Theme {}
  // allow configuration using `createTheme`
  interface ThemeOptions {
    severity?: typeof severity;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    balance: true;
    title: true;
    subtitle: true;
    xl: true;
    lg: true;
    md: true;
    sm: true;
    xs: true;
  }
}

const theme = createTheme({
  palette: palette,
  severity: severity,
  typography: typography,
  components: {
    MuiButton: MuiButton,
    MuiTooltip: MuiTooltip,
    MuiTypography: {
      defaultProps: {
        variant: "body1",
        variantMapping: {
          h1: "p",
          h2: "p",
          h3: "p",
          h4: "p",
          h5: "p",
          h6: "p",
          subtitle1: "p",
          subtitle2: "p",
          body1: "p",
          body2: "p",
          balance: "p",
          title: "p",
          subtitle: "p",
          xl: "p",
          lg: "p",
          md: "p",
          sm: "p",
          xs: "p",
        },
      },
      styleOverrides: {
        root: {
          fontFamily: "Geologica",
          fontSize: "16px",
          color: "var(--tg-theme-text-color, #000000)",
          margin: 0,
          padding: 0,
          fontWeight: "normal",
        },
      },
      variants: [
        {
          props: { variant: "body1" },
          style: {
            fontSize: "16px",
            lineHeight: 1.5,
          },
        },
        {
          props: { variant: "balance" },
          style: {
            fontSize: "40px",
            fontWeight: 700,
            lineHeight: "120%",
          },
        },
        {
          props: { variant: "title" },
          style: {
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: "145%",
          },
        },
        {
          props: { variant: "subtitle" },
          style: {
            fontSize: "18px",
            fontWeight: 300,
          },
        },
        {
          props: { variant: "xl" },
          style: {
            fontSize: "20px",
          },
        },
        {
          props: { variant: "lg" },
          style: {
            fontSize: "18px",
          },
        },
        {
          props: { variant: "md" },
          style: {
            fontSize: "16px",
          },
        },
        {
          props: { variant: "sm" },
          style: {
            fontSize: "14px",
          },
        },
        {
          props: { variant: "xs" },
          style: {
            fontSize: "12px",
          },
        },
        {
          props: { color: "hint" },
          style: {
            color: "var(--tg-theme-hint-color, #999999)",
          },
        },
      ],
    },
    MuiDivider: MuiDivider,
  },
});

export default theme;
