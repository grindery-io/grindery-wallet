import React from "react";
import { Box, Stack, SxProps } from "@mui/material";
import { useChain } from "../Chain";

type ChainAvatarProps = {
  size?: number;
  sx?: SxProps | React.CSSProperties;
};

const ChainAvatar = ({ size = 36, sx }: ChainAvatarProps) => {
  const chain = useChain();
  const avatar = chain?.logo || "";

  return (
    <Box
      sx={{
        width: `${size}px`,
        minWidth: `${size}px`,
        height: `${size}px`,
        position: "relative",
        ...(sx || {}),
      }}
    >
      <Box
        sx={{
          borderRadius: "50%",
          overflow: "hidden",
          width: "100%",
          minWidth: "100%",
          height: "100%",
        }}
      >
        {Boolean(avatar) ? (
          <img
            src={avatar}
            alt={chain?.label}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              minWidth: "100%",
            }}
          />
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "100%",
              height: "100%",
              color: "#fff",
              fontSize: Math.round(size / 2.2),
              background: "var(--tg-theme-hint-color, #999999)",
            }}
          >
            {chain?.label.split(" ")?.[0]?.charAt(0)?.toUpperCase() || ""}
            {chain?.label.split(" ")?.[1]?.charAt(0)?.toUpperCase() || ""}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default ChainAvatar;
