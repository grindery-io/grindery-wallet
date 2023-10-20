import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const CloseIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      sx={{ ...(props.sx || {}), width: "12px", height: "12px" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M1 11L11 1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 1L11 11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

export default CloseIcon;
