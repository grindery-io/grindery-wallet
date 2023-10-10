import React from "react";
import DataBox from "./DataBox";
import moment from "moment";
import useAppContext from "../../hooks/useAppContext";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import { TelegramUserActivity } from "../../types/Telegram";
import { formatBalance } from "../../utils/formatBalance";
import { useNavigate } from "react-router";
import useAppUser from "../../hooks/useAppUser";
import UserAvatar from "./UserAvatar";
import { Typography } from "@mui/material";

type Props = {
  activity: TelegramUserActivity;
  onClick?: () => void;
  onAvatarClick?: () => void;
};

const PendingReward = ({ activity, onClick, onAvatarClick }: Props) => {
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexWrap: "nowrap",
              flexDirection: "row",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                minWidth: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                color: "#fff",
                position: "relative",
              }}
              onClick={
                typeof onAvatarClick !== "undefined"
                  ? onAvatarClick
                  : (e: React.MouseEvent) => {
                      e.stopPropagation();
                      navigate(`/contacts/${secondaryUser.id}`);
                    }
              }
            >
              <UserAvatar user={secondaryUser} size={36} />

              <div
                style={{
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
              </div>
            </div>
            <div>
              <Typography
                sx={{
                  lineHeight: "1.5",
                }}
                variant="xs"
              >
                Referral reward
              </Typography>

              <Typography
                color="hint"
                variant="xs"
                sx={{
                  lineHeight: "1.5",
                }}
              >
                {secondaryUser.name}
              </Typography>
            </div>
          </div>
        }
        RightComponent={
          <div>
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
          </div>
        }
      />
    </li>
  );
};

export default PendingReward;
