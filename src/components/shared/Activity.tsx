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

const Activity = ({ activity }: { activity: TelegramUserActivity }) => {
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

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <li
      style={{
        listStyleType: "none",
        padding: 0,
        margin: "0 0 10px",
      }}
    >
      <DataBox
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
            >
              {getAvatarText()}
              <div
                style={{
                  position: "absolute",
                  bottom: "0px",
                  right: "0px",
                  borderRadius: "50%",
                  background: "#ffffff",
                  padding: "2px",
                }}
              >
                {user?.userTelegramID === activity.senderTgId ? (
                  <CallMadeIcon
                    sx={{ color: "#000", display: "block", fontSize: "12px" }}
                  />
                ) : (
                  <CallReceivedIcon
                    sx={{ color: "#000", display: "block", fontSize: "12px" }}
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
                }}
              >
                {user?.userTelegramID === activity.senderTgId
                  ? "Sent to"
                  : "Recieved from"}{" "}
                {getSecondaryUserDisplayName(secondaryUser)}
              </p>

              <p
                style={{
                  margin: "0",
                  fontSize: "12px",
                  opacity: "0.6",
                  lineHeight: "1.5",
                }}
              >
                {moment(activity.dateAdded).fromNow()}
              </p>
            </div>
          </div>
        }
        RightComponent={
          <div>
            <p style={{ fontSize: "10px", margin: 0 }}>
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                {activity.tokenAmount}
              </span>{" "}
              {activity.tokenSymbol}
            </p>
          </div>
        }
      />
    </li>
  );
};

export default Activity;
