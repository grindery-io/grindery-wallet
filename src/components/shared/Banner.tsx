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
        background: "var(--grindery-cool-grey-cool-grey-100, #0B0C0E)",
        boxShadow: "5px 5px 20px 0px #AAB8D3",
        color: "#FFF",
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
        ...(sx || {}),
      }}
    >
      {children}
      {typeof onClose !== "undefined" && (
        <IconButton sx={{ marginLeft: "auto", padding: 0 }} onClick={onClose}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.25 9.75L9.75 2.25"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.25 2.25L9.75 9.75"
              stroke="white"
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
