import React, { useState } from "react";
import { Box, SxProps } from "@mui/material";
import { useToken } from "../Token";

export const DEFAULT_TOKEN_ICON_URL: {
  [chain: string]: string;
} = {
  "137": "https://polygonscan.com/assets/poly/images/svg/empty-token.svg",
  "59144": "https://lineascan.build/images/main/empty-token.png",
};

export type TokenIconProps = {
  size?: number;
  sx?: SxProps | React.CSSProperties;
};

const TokenIcon = ({ size = 32, sx }: TokenIconProps) => {
  const { icon, chain } = useToken();
  const [loaded, setLoaded] = useState(false);

  return (
    <Box
      className="token-icon"
      sx={{
        position: "relative",
        borderRadius: "50%",
        width: `${size}px`,
        minWidth: `${size}px`,
        height: `${size}px`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundImage: loaded
          ? `url(${icon})`
          : `url(${
              DEFAULT_TOKEN_ICON_URL[chain] || DEFAULT_TOKEN_ICON_URL["137"]
            })`,
        ...(sx || {}),
      }}
    >
      <img
        src={icon}
        style={{
          opacity: 0,
          position: "absolute",
          visibility: "hidden",
          width: "10px",
          height: "10px",
        }}
        alt=""
        onLoad={() => {
          setLoaded(true);
        }}
      />
    </Box>
  );
};

export default TokenIcon;
