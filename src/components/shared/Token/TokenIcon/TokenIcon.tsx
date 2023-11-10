import React, { useState } from "react";
import { Box, SxProps } from "@mui/material";
import { useToken } from "../Token";

export const DEFAULT_TOKEN_ICON_URL: {
  [chain: string]: string;
} = {
  "137": "https://polygonscan.com/assets/poly/images/svg/empty-token.svg",
};

export type TokenIconProps = {
  size?: number;
  sx?: SxProps | React.CSSProperties;
};

const TokenIcon = ({ size = 32, sx }: TokenIconProps) => {
  const { icon, chain } = useToken();
  const [loaded, setLoaded] = useState(false);

  return icon ? (
    <Box
      sx={{
        position: "relative",
        borderRadius: "50%",
        width: `${size}px`,
        minWidth: `${size}px`,
        height: `${size}px`,
        backgroundImage: loaded
          ? `url(${icon})`
          : `url(${
              DEFAULT_TOKEN_ICON_URL[chain] || DEFAULT_TOKEN_ICON_URL["137"]
            })`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
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
  ) : null;
};

export default TokenIcon;
