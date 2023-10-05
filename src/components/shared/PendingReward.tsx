import React, { useCallback, useEffect, useState } from "react";
import DataBox from "./DataBox";
import moment from "moment";
import useAppContext from "../../hooks/useAppContext";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import axios from "axios";
import { BOT_API_URL } from "../../constants";
import { getSecondaryUserDisplayName } from "../../utils/getSecondaryUserDisplayName";
import {
  TelegramUser,
  TelegramUserActivity,
  TelegramUserContact,
} from "../../types/Telegram";
import { formatBalance } from "../../utils/formatBalance";
import { useNavigate } from "react-router";

type Props = {
  activity: TelegramUserActivity;
  onClick?: () => void;
  onAvatarClick?: () => void;
};

const PendingReward = ({ activity, onClick, onAvatarClick }: Props) => {
  const navigate = useNavigate();
  const {
    state: { user, contacts },
  } = useAppContext();

  const secondaryUserId =
    user?.userTelegramID === activity.senderTgId
      ? activity.recipientTgId
      : activity.senderTgId;

  const [secondaryUser, setSecondaryUser] = useState<
    TelegramUserContact | TelegramUser | undefined
  >(contacts?.find((contact) => contact.id === secondaryUserId));

  const [photo, setPhoto] = useState(
    localStorage.getItem("gr_wallet_contact_photo_" + secondaryUserId) || ""
  );
  const { formatted } = formatBalance(parseFloat(activity.tokenAmount));

  const getUser = useCallback(async () => {
    if (!secondaryUserId) return;
    if (secondaryUser) return;
    try {
      const res = await axios.get(
        `${BOT_API_URL}/v1/telegram/user?id=${secondaryUserId}`,
        {
          headers: {
            Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
          },
        }
      );

      setSecondaryUser(res.data);
    } catch (err) {
      setSecondaryUser(undefined);
    }
  }, [secondaryUserId, secondaryUser]);

  const getAvatarText = () => {
    let avatarText = "";
    if (secondaryUser) {
      if ("firstName" in secondaryUser && secondaryUser.firstName) {
        avatarText += secondaryUser.firstName.charAt(0).toUpperCase();
      }
      if ("lastName" in secondaryUser && secondaryUser.lastName) {
        avatarText += secondaryUser.lastName.charAt(0).toUpperCase();
      }
      if (
        !avatarText &&
        "username" in secondaryUser &&
        secondaryUser.username
      ) {
        avatarText += secondaryUser.username.charAt(0).toUpperCase();
      }
    }
    return avatarText || "U";
  };

  const getPhoto = useCallback(async () => {
    if (!secondaryUser || "username"! in secondaryUser) {
      return;
    }
    if (
      "username" in secondaryUser &&
      "id" in secondaryUser &&
      secondaryUser.username
    ) {
      try {
        const res = await axios.get(
          `${BOT_API_URL}/v1/telegram/user/photo?username=${secondaryUser.username}`,
          {
            headers: {
              Authorization: `Bearer ${
                window.Telegram?.WebApp?.initData || ""
              }`,
            },
          }
        );
        setPhoto(res.data.photo || "");

        localStorage.setItem(
          "gr_wallet_contact_photo_" + secondaryUser.id,
          res.data.photo || "null"
        );
      } catch (err) {
        setPhoto("");
      }
    }
  }, [secondaryUser]);

  useEffect(() => {
    if (!photo) {
      getPhoto();
    }
  }, [photo, getPhoto]);

  useEffect(() => {
    getUser();
  }, [getUser]);

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
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                background: "#898989",
                color: "#fff",
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
              {photo && photo !== "null" ? (
                <img
                  src={photo}
                  alt=""
                  style={{
                    width: "36px",
                    height: "36px",
                    display: "block",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                getAvatarText()
              )}
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
              <p
                style={{
                  lineHeight: "1.5",
                  fontSize: "12px",
                  margin: 0,
                  color: "var(--tg-theme-text-color, #000000)",
                }}
              >
                Referral reward
              </p>

              <p
                style={{
                  margin: "0",
                  fontSize: "12px",
                  color: "var(--tg-theme-hint-color, #999999)",
                  lineHeight: "1.5",
                }}
              >
                {getSecondaryUserDisplayName(secondaryUser)}
              </p>
            </div>
          </div>
        }
        RightComponent={
          <div>
            <p
              style={{
                fontSize: "10px",
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
