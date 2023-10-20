import React from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { Box } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../store";
import LinkIcon from "../icons/LinkIcon";

type UserAddressProps = {
  address?: string;
  avatar?: boolean;
  border?: boolean;
};

/**
 * User wallet address
 * @since 0.3
 * @param props UserAddressProps
 * @returns React function component
 */
const UserAddress = ({
  address: providedAddress,
  avatar = true,
  border = true,
}: UserAddressProps) => {
  const { user } = useAppSelector(selectAppStore);

  const address = providedAddress || user?.patchwallet;

  return address ? (
    <Box textAlign="center">
      <span>
        <button
          onClick={() => {
            if (window.Telegram?.WebApp?.openLink) {
              window.Telegram.WebApp.openLink(
                `https://polygonscan.com/token/0xe36bd65609c08cd17b53520293523cf4560533d0?a=${address}`
              );
            } else {
              window.open(
                `https://polygonscan.com/token/0xe36bd65609c08cd17b53520293523cf4560533d0?a=${address}`,
                "_blank"
              );
            }
          }}
          style={{
            ...UserAddressButtonStyles,
            border: border ? "1px solid #D3DEEC" : "none",
            padding: border ? "4px 10px 4px 5px" : 0,
          }}
        >
          {avatar && (
            <Jazzicon diameter={18} seed={jsNumberForAddress(address)} />
          )}

          <span style={UserAddressTextStyles}>
            {address.substring(0, 6) +
              "..." +
              address.substring(address.length - 4)}
          </span>
          <span>
            <LinkIcon />
          </span>
        </button>
      </span>
    </Box>
  ) : null;
};

const UserAddressButtonStyles: React.CSSProperties = {
  cursor: "pointer",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "auto",
  margin: "0 auto",
  borderRadius: "34px",
  gap: "10px",
  background: "transparent",
  color: "var(--tg-theme-link-color, #2481cc)",
};

const UserAddressTextStyles = {
  color: "var(--tg-theme-link-color, #2481cc)",
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "150%",
  fontFamily: "Geologica",
};

export default UserAddress;
