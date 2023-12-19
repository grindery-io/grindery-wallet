import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const ArrowDownIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      sx={{ width: "16px", height: "14px", ...(props.sx || {}) }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        style={{
          marginBottom: "8px",
          color: "var(--tg-theme-text-color, #000000)",
        }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.602056 6.44593L1.90748 5.1405L8.00002 11.233L14.0925 5.1405L15.398 6.44593L8.00002 13.8439L0.602056 6.44593Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.92308 0.23077V11.3077H7.07692V0.23077H8.92308Z"
          fill="currentColor"
        />
      </svg>
    </SvgIcon>
  );
};

export default ArrowDownIcon;
