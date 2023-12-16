import React from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { Box, SxProps } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../store";
import LinkIcon from "../icons/LinkIcon";
import CopyIcon from "components/icons/CopyIcon";

type UserAddressProps = {
  address?: string;
  avatar?: boolean;
  border?: boolean;
  copy?: boolean;
  link?: boolean;
  sx?: SxProps;
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
  copy = true,
  link = true,
  sx,
}: UserAddressProps) => {
  const { user } = useAppSelector(selectAppStore);

  const address = providedAddress || user?.patchwallet;

  return address ? (
    <Box textAlign="center">
      <span>
        <Box
          sx={{
            ...UserAddressBoxStyles,
            border: border ? "1px solid var(--gr-theme-divider-color)" : "none",
            padding: border ? "4px 10px 4px 5px" : 0,
            ...(sx || {}),
          }}
        >
          {avatar && (
            <Jazzicon diameter={18} seed={jsNumberForAddress(address)} />
          )}

          <Box
            component="span"
            sx={UserAddressTextStyles}
            onClick={() => {
              navigator.clipboard.writeText(user?.patchwallet || "");
              setTimeout(() => {
                if (window.Telegram?.WebApp?.showAlert) {
                  window.Telegram?.WebApp?.showAlert("Wallet address copied");
                } else {
                  window.alert("Wallet address copied");
                }
              }, 150);
            }}
          >
            {address.substring(0, 6) +
              "..." +
              address.substring(address.length - 4)}
          </Box>
          {copy && (
            <span>
              <CopyIcon
                sx={{ width: "14px", height: "14px", marginTop: "6px" }}
                onClick={() => {
                  navigator.clipboard.writeText(user?.patchwallet || "");
                  setTimeout(() => {
                    if (window.Telegram?.WebApp?.showAlert) {
                      window.Telegram?.WebApp?.showAlert(
                        "Wallet address copied"
                      );
                    } else {
                      window.alert("Wallet address copied");
                    }
                  }, 150);
                }}
              />
            </span>
          )}
          {link && (
            <span>
              <LinkIcon
                onClick={() => {
                  if (window.Telegram?.WebApp?.openLink) {
                    window.Telegram.WebApp.openLink(
                      `https://polygonscan.com/tokenholdings?a=${address}`
                    );
                  } else {
                    window.open(
                      `https://polygonscan.com/tokenholdings?a=${address}`,
                      "_blank"
                    );
                  }
                }}
              />
            </span>
          )}
        </Box>
      </span>
    </Box>
  ) : null;
};

const UserAddressBoxStyles: React.CSSProperties = {
  cursor: "pointer",
  display: "inline-flex",
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
