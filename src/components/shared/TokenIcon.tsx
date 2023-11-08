import React, { useState } from "react";
import { Box, SxProps } from "@mui/material";
import { DEFAULT_TOKEN_ICON_URL } from "../../constants";

type Props = {
  url: string;
  size?: number;
  sx?: SxProps | React.CSSProperties;
};

const TokenIcon = ({ url, size = 36, sx }: Props) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "50%",
        width: `${size}px`,
        minWidth: `${size}px`,
        height: `${size}px`,
        backgroundImage: loaded
          ? `url(${url})`
          : `url(${DEFAULT_TOKEN_ICON_URL})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        ...(sx || {}),
      }}
    >
      <img
        src={url}
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
