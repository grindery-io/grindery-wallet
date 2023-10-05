import React from "react";
import { Box, IconButton, SxProps } from "@mui/material";

type Props = {
  visible: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  sx?: SxProps;
};

const Banner = ({ visible, children, onClose, sx }: Props) => {
  return visible ? (
    <Box
      sx={{
        position: "fixed",
        left: "8px",
        bottom: "64px",
        width: "calc(100% - 16px)",
        boxSizing: "border-box",
        borderRadius: "12px",
        background: "var(--tg-theme-secondary-bg-color, #efeff3)",
        boxShadow:
          "5px 5px 20px 0px var(--tg-theme-secondary-bg-color, #efeff3)",
        color: "var(--tg-theme-text-color, #000000)",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: "8px",
        flexWrap: "nowrap",
        fontSize: "12px",
        fontWeight: "400",
        lineHeight: "125%",
        padding: "8px 12px",
        "& a": {
          color: "var(--tg-theme-link-color, #2481cc)",
        },
        ...(sx || {}),
      }}
    >
      {children}
      {typeof onClose !== "undefined" && (
        <IconButton
          sx={{
            marginLeft: "auto",
            padding: 0,
            color: "var(--tg-theme-text-color, #000000)",
          }}
          onClick={onClose}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.25 9.75L9.75 2.25"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.25 2.25L9.75 9.75"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </IconButton>
      )}
    </Box>
  ) : null;
};

export default Banner;
