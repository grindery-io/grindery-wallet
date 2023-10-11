import React from "react";
import moment from "moment";
import useAppContext from "../../hooks/useAppContext";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import { TelegramUserActivity } from "../../types/Telegram";
import { formatBalance } from "../../utils/formatBalance";
import useAppUser from "../../hooks/useAppUser";
import UserAvatar from "./UserAvatar";
import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

type Props = {
  activity: TelegramUserActivity;
  onClick?: () => void;
  onAvatarClick?: () => void;
};

const PendingReward = ({ activity, onClick, onAvatarClick }: Props) => {
  const {
    state: { user },
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
        overflow: "hidden",
      }}
    >
      <ListItemButton
        sx={{ padding: "10px" }}
        onClick={() => {
          setTimeout(() => {
            if (typeof onClick !== "undefined") {
              onClick();
            } else {
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
          }, 150);
        }}
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
        <Box ml="auto">
          <p
            style={{
              margin: 0,
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: "row",
              gap: "6px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "var(--tg-theme-text-color, #000000)",
              }}
            >
              {formatted}
            </span>{" "}
            <img
              src="/images/g1-token-red.svg"
              alt=""
              width="16"
              style={{ display: "inline-block" }}
            />
          </p>
          <span
            style={{
              margin: "4px 0 0",
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
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default PendingReward;
