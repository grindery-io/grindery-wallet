import React from "react";
import { Box, IconButton } from "@mui/material";

type Props = {
  visible: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
};

const Banner = ({ visible, children, onClose }: Props) => {
  return visible ? (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        bottom: "56px",
        width: "100%",
        boxSizing: "border-box",
        background: "var(--grindery-cool-grey-cool-grey-100, #0B0C0E)",
        color: "#FFF",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "16px",
        flexWrap: "nowrap",
        fontSize: "12px",
        fontWeight: "400",
        lineHeight: "125%",
        padding: "8px 42px",
      }}
    >
      <div>{children}</div>
      {typeof onClose !== "undefined" && (
        <IconButton
          sx={{ position: "absolute", right: "16px", top: "1px" }}
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
