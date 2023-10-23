import React from "react";
import { Alert, AlertProps, Box, SxProps } from "@mui/material";

type Props = {
  children: React.ReactNode;
  color?: AlertProps["color"];
  icon?: React.ReactNode;
  style?: React.CSSProperties | SxProps;
};

const AlertBox = (props: Props) => {
  const { children, color, icon, style } = props;
  return (
    <Box sx={{ ...AlertBoxStyles, ...(style || {}) }}>
      <Alert color={color} icon={icon}>
        {children}
      </Alert>
    </Box>
  );
};

const AlertBoxStyles = {
  margin: "20px 0 0",

  "& .MuiAlert-root": {
    padding: "20px",
    borderRadius: "5px",
  },

  "& .MuiAlert-message": {
    padding: 0,
  },

  "& .MuiAlert-icon": {
    padding: 0,

    "& svg": {
      marginTop: "2px",
    },
  },

  "& .MuiAlert-message p": {
    textAlign: "left",
    padding: 0,
    margin: 0,
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "150%",
    color: "#6d6f78",

    "& a": {
      color: "#170b10",
      textDecoration: "underline",

      "&:hover": {
        color: "#170b10",
        textDecoration: "none",
      },
    },
  },
};

export default AlertBox;
