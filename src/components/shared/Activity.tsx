import React from "react";
import moment from "moment";
import useAppContext from "../../hooks/useAppContext";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import { TelegramUserActivity } from "../../types/Telegram";
import { formatBalance } from "../../utils/formatBalance";
import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import useAppUser from "../../hooks/useAppUser";
import UserAvatar from "./UserAvatar";

type Props = {
  activity: TelegramUserActivity;
  onClick?: () => void;
  onAvatarClick?: () => void;
};

const Activity = ({ activity, onClick }: Props) => {
  const {
    state: { user, devMode },
  } = useAppContext();

  const secondaryUserId =
    user?.userTelegramID === activity.senderTgId
      ? activity.recipientTgId
      : activity.senderTgId;

  const { user: secondaryUser } = useAppUser(secondaryUserId);

  const { formatted } = formatBalance(parseFloat(activity.tokenAmount));

  return (
    <ListItem
      sx={{
        margin: "10px 16px 0",
        width: "calc(100% - 32px)",
        padding: 0,
        backgroundColor: "transparent",
        border: "1px solid var(--gr-theme-divider-color)",
        borderRadius: "5px",
      }}
    >
      <ListItemButton
        sx={{ padding: "10px" }}
        onClick={
          typeof onClick !== "undefined"
            ? onClick
            : () => {
                if (window.Telegram?.WebApp?.openLink) {
                  window.Telegram.WebApp.openLink(
                    `https://polygonscan.com/tx/${activity.transactionHash}`
                  );
                } else {
                  window.open(
                    `https://polygonscan.com/tx/${activity.transactionHash}`,
                    "_blank"
                  );
                }
              }
        }
      >
        <ListItemAvatar
          sx={{ minWidth: "36px", marginRight: "10px", position: "relative" }}
        >
          <UserAvatar user={secondaryUser} size={36} />
          <Box
            sx={{
              position: "absolute",
              bottom: "-2px",
              right: "-2px",
              borderRadius: "50%",
              background: "var(--tg-theme-bg-color, #ffffff)",
              padding: "2px",
            }}
          >
            {user?.userTelegramID === activity.senderTgId ? (
              <CallMadeIcon
                sx={{
                  color: "var(--tg-theme-text-color, #000000)",
                  display: "block",
                  fontSize: "12px",
                }}
              />
            ) : (
              <CallReceivedIcon
                sx={{
                  color: "var(--tg-theme-text-color, #000000)",
                  display: "block",
                  fontSize: "12px",
                }}
              />
            )}
          </Box>
        </ListItemAvatar>
        <ListItemText
          sx={{ margin: "0 10px 0 0" }}
          primary={`${
            user?.userTelegramID === activity.senderTgId
              ? "Sent to"
              : "Received from"
          } ${secondaryUser.name}`}
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
          secondary={moment(activity.dateAdded).fromNow()}
        ></ListItemText>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing="6px"
          ml="auto"
        >
          <Typography
            variant="sm"
            sx={{
              letterSpacing: "0.55px",
              fontWeight: "bold",
              color:
                devMode.features?.coloredNumbers &&
                user?.userTelegramID !== activity.senderTgId
                  ? "var(--gr-theme-success-color)"
                  : undefined,
            }}
          >
            {devMode.features?.coloredNumbers && (
              <>{user?.userTelegramID === activity.senderTgId ? "-" : "+"}</>
            )}
            {formatted}
          </Typography>{" "}
          <img
            src="/images/g1-token-red.svg"
            alt=""
            width="16"
            style={{ display: "block" }}
          />
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

export default Activity;
