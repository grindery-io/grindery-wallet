import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const StakingIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      sx={{ width: "20px", height: "20px", ...(props.sx || {}) }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>safe</title>
        <path
          d="M4,4A2,2 0 0,0 2,6V17A2,2 0 0,0 4,19V20H6V19H17V20H19V19A2,2 0 0,0 21,17V16H22V14H21V9H22V7H21V6A2,2 0 0,0 19,4H4M4,6H19V17H4V6M13.5,7.5A4,4 0 0,0 9.5,11.5A4,4 0 0,0 13.5,15.5A4,4 0 0,0 17.5,11.5A4,4 0 0,0 13.5,7.5M5,9V14H7V9H5M13.5,9.5A2,2 0 0,1 15.5,11.5A2,2 0 0,1 13.5,13.5A2,2 0 0,1 11.5,11.5A2,2 0 0,1 13.5,9.5Z"
          fill="currentColor"
        />
      </svg>
    </SvgIcon>
  );
};

export default StakingIcon;
