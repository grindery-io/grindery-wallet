import { createTheme } from "@mui/material";
import palette from "./palette";
import severity from "./severity";
import typography from "./typography";
import MuiTooltip from "./components/MuiTooltip";
import MuiDivider from "./components/MuiDivider";
import { red } from "@mui/material/colors";

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
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          fontFamily: "Geologica",
          fontWeight: "700",
          fontSize: 14,
          lineHeight: "150%",
          color: "var(--tg-theme-button-text-color, #ffffff)",
          boxShadow: "none",
          margin: "0px",
          backgroundColor: "var(--tg-theme-button-color, #2481CC)",
          border: "1px solid var(--tg-theme-button-color, #2481CC)",
          "& .MuiTouchRipple-root": {
            marginRight: 0,
          },
          "&:disabled": {
            opacity: 0.4,
            color: "var(--tg-theme-button-text-color, #ffffff)",
            backgroundColor: "var(--tg-theme-button-color, #2481CC)",
          },
          "&:active": {
            boxShadow: "none",
          },
          "&:hover": {
            opacity: 1,
            color: "var(--tg-theme-button-text-color, #ffffff)",
            backgroundColor: "var(--tg-theme-button-color, #2481CC)",
            border: "1px solid var(--tg-theme-button-color, #2481CC)",
            boxShadow: "none",
          },
        },
        containedPrimary: {
          color: "var(--tg-theme-button-text-color, #ffffff)",
          backgroundColor: "var(--tg-theme-button-color, #2481CC)",
          border: "1px solid var(--tg-theme-button-color, #2481CC)",
          "&:hover": {
            color: "var(--tg-theme-button-text-color, #ffffff)",
            backgroundColor: "var(--tg-theme-button-color, #2481CC)",
            border: "1px solid var(--tg-theme-button-color, #2481CC)",
          },
          "&:disabled": {
            color: "var(--tg-theme-button-text-color, #ffffff)",
            backgroundColor: "var(--tg-theme-button-color, #2481CC)",
          },
        },
        containedSecondary: {
          color: "var(--tg-theme-button-text-color, #ffffff)",
          backgroundColor: "var(--tg-theme-button-color, #2481CC)",
          border: "1px solid var(--tg-theme-button-color, #2481CC)",
          "&:hover": {
            color: "var(--tg-theme-button-text-color, #ffffff)",
            backgroundColor: "var(--tg-theme-button-color, #2481CC)",
            border: "1px solid var(--tg-theme-button-color, #2481CC)",
          },
          "&:disabled": {
            color: "var(--tg-theme-button-text-color, #ffffff)",
            backgroundColor: "var(--tg-theme-button-color, #2481CC)",
          },
        },
        outlinedPrimary: {
          color: "var(--tg-theme-button-color, #2481CC)",
          backgroundColor: "transparent",
          border: "1px solid var(--tg-theme-button-color, #2481CC)",
          "&:hover": {
            color: "var(--tg-theme-button-color, #2481CC)",
            backgroundColor: "transparent",
            border: "1px solid var(--tg-theme-button-color, #2481CC)",
          },
          "&:disabled": {
            color: "var(--tg-theme-button-color, #2481CC)",
            backgroundColor: "transparent",
          },
        },
        outlinedSecondary: {
          color: "var(--tg-theme-button-color, #2481CC)",
          backgroundColor: "transparent",
          border: "1px solid var(--tg-theme-button-color, #2481CC)",
          "&:hover": {
            color: "var(--tg-theme-button-color, #2481CC)",
            backgroundColor: "transparent",
            border: "1px solid var(--tg-theme-button-color, #2481CC)",
          },
          "&:disabled": {
            color: "var(--tg-theme-button-color, #2481CC)",
            backgroundColor: "transparent",
          },
        },
        outlinedError: {
          color: red[500],
          backgroundColor: "transparent",
          border: `1px solid ${red[500]}`,
          "&:hover": {
            color: red[500],
            backgroundColor: "transparent",
            border: `1px solid ${red[500]}`,
          },
          "&:disabled": {
            color: red[500],
            backgroundColor: "transparent",
            border: `1px solid ${red[500]}`,
            opacity: 0.5,
          },
        },
        textPrimary: {
          color: "var(--tg-theme-button-color, #2481CC)",
          backgroundColor: "transparent",
          border: "1px solid transparent",
          "&:hover": {
            color: "var(--tg-theme-button-color, #2481CC)",
            backgroundColor: "transparent",
            border: "1px solid transparent",
          },
          "&:disabled": {
            color: "var(--tg-theme-button-color, #2481CC)",
            backgroundColor: "transparent",
            border: "1px solid transparent",
            opacity: 0.5,
          },
        },
        sizeSmall: {
          fontSize: "12px",
          padding: "8px 16px",
        },
        sizeLarge: {
          fontSize: "16px",
          fontWeight: "300",
          padding: "12px 24px",
        },
      },
    },
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
