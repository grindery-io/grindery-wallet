import React from "react";
import DataBox from "./DataBox";
import { TelegramUserContact } from "../../types/Telegram";
import CheckIcon from "../icons/CheckIcon";
import { useLongPress } from "use-long-press";
import { Box, Typography } from "@mui/material";
import useAppUser from "../../hooks/useAppUser";
import UserAvatar from "./UserAvatar";

type Props = {
  contact: TelegramUserContact;

  selected?: boolean;
  onContactClick: (contact: TelegramUserContact) => void;
  onContactPress?: (contact: TelegramUserContact) => void;
};

const TelegramContact = ({
  contact,

  selected,
  onContactClick,
  onContactPress,
}: Props) => {
  const { user } = useAppUser(contact.id);
  const bind = useLongPress(() => {
    if (typeof onContactPress !== "undefined") {
      onContactPress(contact);
    }
  });

  return (
    <li
      style={{
        listStyleType: "none",
        padding: 0,
        margin: "10px 16px 0",
        WebkitUserSelect:
          typeof onContactPress !== "undefined" ? "none" : "auto",
        userSelect: typeof onContactPress !== "undefined" ? "none" : "auto",
      }}
      {...(typeof onContactPress !== "undefined" ? bind() : {})}
    >
      <DataBox
        style={{
          background: "var(--tg-theme-bg-color, #ffffff)",
          border: selected
            ? "1px solid var(--tg-theme-button-color, #2481cc)"
            : "1px solid var(--gr-theme-divider-color)",
          boxShadow: selected
            ? "var(--tg-theme-button-color, #2481cc) 0px 0px 0px 1px inset"
            : "none",
        }}
        LeftComponent={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexWrap: "nowrap",
              flexDirection: "row",
              gap: "16px",
            }}
          >
            <Box
              sx={{
                position: "relative",
              }}
            >
              <UserAvatar size={36} user={user} />
              {contact.isGrinderyUser && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "-6px",
                    right: "-6px",
                    border: "2px solid var(--tg-theme-bg-color, #ffffff)",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src="https://app.grindery.io/logo192.png"
                    alt=""
                    style={{ width: "16px", height: "16px", display: "block" }}
                  />
                </Box>
              )}
            </Box>
            <Box>
              <Typography sx={{ lineHeight: "1.5" }} variant="xs">
                {contact.firstName || contact.lastName
                  ? `${contact.firstName}${
                      contact.lastName ? " " + contact.lastName : ""
                    }`
                  : `@${contact.username}`}
              </Typography>

              {(contact.firstName || contact.lastName) && contact.username ? (
                <Typography
                  sx={{ lineHeight: "1.5" }}
                  variant="xs"
                  color="hint"
                >
                  @{contact.username}
                </Typography>
              ) : null}
            </Box>
          </Box>
        }
        onClick={() => {
          onContactClick(contact);
        }}
        RightComponent={
          selected ? (
            <Box
              sx={{
                position: "relative",
                top: "-6px",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "flex-end",
                flexWrap: "nowrap",
                gap: "4px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="16" height="16" rx="8" fill="#2AABEE" />
                <path
                  d="M6.60043 11.1419C6.48898 11.1419 6.37862 11.12 6.27566 11.0773C6.1727 11.0346 6.07917 10.9721 6.00043 10.8932L4.18643 9.07987C4.0927 8.98611 4.04004 8.85896 4.04004 8.72637C4.04004 8.59379 4.0927 8.46664 4.18643 8.37287C4.2802 8.27914 4.40735 8.22648 4.53993 8.22648C4.67251 8.22648 4.79967 8.27914 4.89343 8.37287L6.60043 10.0799L11.1164 5.56387C11.2102 5.47014 11.3374 5.41748 11.4699 5.41748C11.6025 5.41748 11.7297 5.47014 11.8234 5.56387C11.9172 5.65764 11.9698 5.78479 11.9698 5.91737C11.9698 6.04996 11.9172 6.17711 11.8234 6.27087L7.20043 10.8932C7.12169 10.9721 7.02816 11.0346 6.9252 11.0773C6.82225 11.12 6.71188 11.1419 6.60043 11.1419Z"
                  fill="white"
                />
              </svg>
            </Box>
          ) : contact.isInvited && !contact.isGrinderyUser ? (
            <Box
              sx={{
                position: "relative",
                top: "-6px",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "flex-end",
                flexWrap: "nowrap",
                gap: "4px",
              }}
            >
              <Typography component="span" variant="xs" color="hint">
                Invited
              </Typography>
              <CheckIcon />
            </Box>
          ) : undefined
        }
      />
    </li>
  );
};

export default TelegramContact;
