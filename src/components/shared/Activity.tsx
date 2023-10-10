import React from "react";
import DataBox from "./DataBox";
import moment from "moment";
import useAppContext from "../../hooks/useAppContext";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import { TelegramUserActivity } from "../../types/Telegram";
import { formatBalance } from "../../utils/formatBalance";
import { useNavigate } from "react-router";
import { Box, Typography } from "@mui/material";
import useAppUser from "../../hooks/useAppUser";
import UserAvatar from "./UserAvatar";

type Props = {
  activity: TelegramUserActivity;
  onClick?: () => void;
  onAvatarClick?: () => void;
};

const Activity = ({ activity, onClick, onAvatarClick }: Props) => {
  const navigate = useNavigate();
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
    <li
      style={{
        listStyleType: "none",
        padding: 0,
        margin: "10px 16px 0",
      }}
    >
      <DataBox
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
        style={{
          border: "1px solid var(--gr-theme-divider-color)",
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
                width: "36px",
                height: "36px",
                minWidth: "36px",
                position: "relative",
              }}
              onClick={
                typeof onAvatarClick !== "undefined"
                  ? onAvatarClick
                  : secondaryUser && "id" in secondaryUser && secondaryUser?.id
                  ? (e: React.MouseEvent) => {
                      e.stopPropagation();
                      navigate(`/contacts/${secondaryUser?.id}`);
                    }
                  : undefined
              }
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
            </Box>
            <Box>
              <Typography variant="xs" sx={{ lineHeight: "1.5" }}>
                {user?.userTelegramID === activity.senderTgId
                  ? "Sent to"
                  : "Received from"}{" "}
                {secondaryUser.name}
              </Typography>

              <Typography color="hint" variant="xs" sx={{ lineHeight: "1.5" }}>
                {moment(activity.dateAdded).fromNow()}
              </Typography>
            </Box>
          </Box>
        }
        RightComponent={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: "row",
              gap: "6px",
            }}
          >
            <Typography variant="sm" sx={{ fontWeight: "bold" }}>
              {formatted}
            </Typography>{" "}
            <img
              src="/images/g1-token-red.svg"
              alt=""
              width="16"
              style={{ display: "block" }}
            />
          </Box>
        }
      />
    </li>
  );
};

export default Activity;
