import React from "react";
import { Box, SxProps } from "@mui/material";
import { useUser } from "../User";

export type UserAddressFormat = "full" | "short";

export type UserAddressProps = {
  format?: UserAddressFormat;
  sx?: SxProps | React.CSSProperties;
};

export const formatUserAddress = (
  address: string,
  format: UserAddressFormat
) => {
  switch (format) {
    case "full":
      return address;
    case "short":
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    default:
      return address;
  }
};

const UserAddress = ({ format = "short", sx }: UserAddressProps) => {
  const user = useUser();
  return user?.patchwallet ? (
    <Box sx={sx} component="span">
      {formatUserAddress(user.patchwallet, format)}
    </Box>
  ) : null;
};

export default UserAddress;
