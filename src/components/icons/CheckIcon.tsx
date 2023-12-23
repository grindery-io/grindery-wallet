import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const CheckIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      sx={{ width: "16px", height: "16px", ...(props.sx || {}) }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="16" height="16" rx="8" fill="currentColor" />
        <path
          d="M6.60043 11.1419C6.48898 11.1419 6.37862 11.12 6.27566 11.0773C6.1727 11.0346 6.07917 10.9721 6.00043 10.8932L4.18643 9.07987C4.0927 8.98611 4.04004 8.85896 4.04004 8.72637C4.04004 8.59379 4.0927 8.46664 4.18643 8.37287C4.2802 8.27914 4.40735 8.22648 4.53993 8.22648C4.67251 8.22648 4.79967 8.27914 4.89343 8.37287L6.60043 10.0799L11.1164 5.56387C11.2102 5.47014 11.3374 5.41748 11.4699 5.41748C11.6025 5.41748 11.7297 5.47014 11.8234 5.56387C11.9172 5.65764 11.9698 5.78479 11.9698 5.91737C11.9698 6.04996 11.9172 6.17711 11.8234 6.27087L7.20043 10.8932C7.12169 10.9721 7.02816 11.0346 6.9252 11.0773C6.82225 11.12 6.71188 11.1419 6.60043 11.1419Z"
          fill="white"
        />
      </svg>
    </SvgIcon>
  );
};

export default CheckIcon;
