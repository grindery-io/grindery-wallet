import { Theme } from "@mui/material/styles";

const MuiButton = {
  styleOverrides: {
    root: {
      borderRadius: 5,
      padding: "10px 20px",
      fontFamily: "Geologica",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: 16,
      lineHeight: "150%",
      backgroundColor: "var(--tg-theme-button-color)",
      color: "var(--tg-theme-button-text-color)",
      boxShadow: "initial",
      margin: "10px 0px",
      "& span": {
        marginRight: "10px",
      },
      "&:hover": {
        opacity: 0.7,
      },
    },
    containedPrimary: ({ theme }: { theme: Theme }) => ({
      "&:disabled": {
        opacity: 0.4,
        backgroundColor: "var(--tg-theme-button-color)",
        color: "var(--tg-theme-button-text-color)",
      },
    }),
    containedSecondary: ({ theme }: { theme: Theme }) => ({
      "&:disabled": {
        opacity: 0.4,
        backgroundColor: "var(--tg-theme-text-color)",
        color: "var(--tg-theme-button-text-color)",
      },
    }),
    sizeSmall: {
      width: 167,
    },
    sizeLarge: {
      width: "100%",
    },
    outlinedPrimary: ({ theme }: { theme: Theme }) => ({
      backgroundColor: "transparent",
      color: theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.main}`,
    }),
    outlinedSecondary: ({ theme }: { theme: Theme }) => ({
      backgroundColor: "transparent",
      color: theme.palette.secondary.main,
      border: `1px solid ${theme.palette.secondary.main}`,
    }),
  },
};

export default MuiButton;
