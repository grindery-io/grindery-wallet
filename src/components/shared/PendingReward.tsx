import React from "react";
import moment from "moment";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import { TelegramUserActivity } from "../../types/Telegram";
import useAppUser from "../../hooks/useAppUser";
import UserAvatar from "./UserAvatar";
import {
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import { selectAppStore, useAppSelector } from "../../store";

type Props = {
  activity: TelegramUserActivity;
  onClick?: () => void;
  onAvatarClick?: () => void;
  onTextClick?: () => void;
};

const PendingReward = ({ activity, onTextClick, onAvatarClick }: Props) => {
  const { user } = useAppSelector(selectAppStore);

  const secondaryUserId =
    user?.userTelegramID === activity.senderTgId
      ? activity.recipientTgId
      : activity.senderTgId;

  const { user: secondaryUser } = useAppUser(secondaryUserId);

  console.log("secondaryUser", secondaryUser);

  return (
    <ListItem
      sx={{
        margin: "10px 16px 0",
        width: "calc(100% - 32px)",
        padding: "10px",
        backgroundColor: "transparent",
        border: "1px solid var(--gr-theme-divider-color)",
        borderRadius: "5px",
        overflow: "hidden",
      }}
    >
      <ListItemAvatar
        onClick={onAvatarClick ? onAvatarClick : undefined}
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
          {user?.userTelegramID === activity?.senderTgId ? (
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
        onClick={onTextClick ? onTextClick : undefined}
        sx={{ margin: 0 }}
        primary="Referral reward"
        secondary={secondaryUser.name}
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
      />
      <Stack
        ml="auto"
        direction="column"
        alignItems="flex-end"
        justifyContent="flex-end"
        spacing="4px"
      >
        {secondaryUser.username && (
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setTimeout(() => {
                if (
                  typeof window.Telegram?.WebApp?.openTelegramLink !==
                  "undefined"
                ) {
                  window.Telegram?.WebApp?.openTelegramLink(
                    "https://t.me/" + secondaryUser.username
                  );
                } else {
                  window.open(
                    "https://t.me/" + secondaryUser.username,
                    "_blank"
                  );
                }
              }, 150);
            }}
            sx={{
              padding: "2px 4px",
              fontSize: "10px",
              borderRadius: "4px",
            }}
          >
            Follow up
          </Button>
        )}

        <span
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "4px",
            color: "black",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: "400",
              color: "var(--tg-theme-hint-color, #999999)",
            }}
          >
            Invited {moment(activity.dateAdded).fromNow()}
          </span>
        </span>
      </Stack>
    </ListItem>
  );
};

export default PendingReward;
