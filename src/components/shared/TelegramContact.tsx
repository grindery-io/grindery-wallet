import React from "react";
import { TelegramUserContact } from "../../types/Telegram";
import CheckIcon from "../icons/CheckIcon";
import { useLongPress } from "use-long-press";
import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
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
    <ListItem
      sx={{
        margin: "10px 16px 0",
        width: "calc(100% - 32px)",
        padding: 0,
        backgroundColor: selected
          ? "var(--tg-theme-accent-pale)"
          : "transparent",
        borderRadius: "5px",
        overflow: "hidden",
        border: selected
          ? "1px solid var(--tg-theme-button-color, #2481cc)"
          : "1px solid var(--gr-theme-divider-color)",
      }}
    >
      <ListItemButton
        sx={{
          padding: "10px",
          WebkitUserSelect:
            typeof onContactPress !== "undefined" ? "none" : "auto",
          userSelect: typeof onContactPress !== "undefined" ? "none" : "auto",
        }}
        onClick={() => {
          setTimeout(() => {
            onContactClick(contact);
          }, 300);
        }}
        {...(typeof onContactPress !== "undefined" ? bind() : {})}
      >
        <ListItemAvatar
          sx={{ minWidth: "36px", marginRight: "16px", position: "relative" }}
        >
          <UserAvatar user={user} size={36} />
          {user.isGrinderyUser && (
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
        </ListItemAvatar>
        <ListItemText
          sx={{ margin: "0 10px 0 0" }}
          primary={user.name}
          primaryTypographyProps={{
            variant: "xs",
            sx: {
              lineHeight: 1.5,
              display: "-webkit-box",
              maxWidth: "100%",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            },
          }}
          secondaryTypographyProps={{
            variant: "xs",
            color: "hint",
            sx: {
              lineHeight: 1.5,
              display: "-webkit-box",
              maxWidth: "100%",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            },
          }}
          secondary={user.username}
        ></ListItemText>

        <Box ml="auto">
          {selected ? (
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
                color: "var(--tg-theme-button-color, #2481cc)",
              }}
            >
              <CheckIcon />
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
              <CheckIcon sx={{ color: "#97C4C7" }} />
            </Box>
          ) : !contact.isInvited && !contact.isGrinderyUser ? (
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
                Eligible!
              </Typography>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <rect width="16" height="16" rx="8" fill="#2481CC" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.89758 10.6703L7.62475 9.55683C7.95299 9.38806 8.25668 9.15887 8.51857 8.87013C9.68731 7.58159 9.58106 5.59519 8.28124 4.43337C6.98143 3.27156 4.98026 3.37429 3.81152 4.66283C2.64278 5.95137 2.74904 7.93777 4.04886 9.09959C4.34412 9.3635 4.67557 9.56217 5.02524 9.6965C4.28924 10.2877 4.1074 11.3475 4.63446 12.1532C5.14125 12.9278 6.1308 13.2037 6.95596 12.8442C7.01723 12.8267 7.07677 12.7993 7.13228 12.7617L7.19827 12.7169C7.20731 12.7113 7.21631 12.7056 7.22528 12.6998L9.24616 11.3278C9.50668 11.167 9.8501 11.2422 10.0179 11.4987C10.1235 11.6601 10.1348 11.8552 10.0654 12.0203C10.5064 11.6681 10.6301 11.0529 10.3592 10.5595C10.0499 9.99631 9.33927 9.78861 8.77189 10.0956C8.74861 10.1082 8.72523 10.1213 8.70176 10.1348C8.67277 10.1484 8.64448 10.1645 8.61716 10.183L8.56932 10.2154C8.5543 10.2251 8.53925 10.2349 8.52415 10.2448L6.50328 11.6168C6.24275 11.7776 5.89934 11.7025 5.7315 11.4459C5.56159 11.1862 5.63595 10.8389 5.89758 10.6703ZM7.3211 5.38146C8.06726 6.05323 8.12826 7.20177 7.45734 7.9468C6.78643 8.69183 5.63766 8.75123 4.8915 8.07947C4.14534 7.40771 4.08435 6.25917 4.75526 5.51414C5.42618 4.7691 6.57494 4.7097 7.3211 5.38146Z"
                  fill="white"
                />
                <path
                  d="M10.495 4.43905C10.8036 4.43669 11.0581 4.68266 11.0686 4.99071L11.0453 6.48103C11.0453 7.35927 12.3558 7.35927 12.3558 6.48239L12.379 4.99207C12.379 4.97384 12.3788 4.95576 12.3785 4.9378L12.379 4.87961C12.3793 4.84638 12.377 4.81372 12.3722 4.78183C12.3705 4.75462 12.3684 4.72774 12.366 4.70119C12.307 4.05438 11.7366 3.57447 11.092 3.62926C10.5273 3.67726 10.0807 4.12397 10.0312 4.69007C10.131 4.53989 10.3009 4.44054 10.495 4.43905Z"
                  fill="white"
                />
              </svg>
            </Box>
          ) : null}
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default TelegramContact;
