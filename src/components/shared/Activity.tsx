import React, { useCallback, useEffect, useState } from "react";
import { TelegramUserActivity } from "../../context/AppContext";
import DataBox from "./DataBox";
import moment from "moment";
import useAppContext from "../../hooks/useAppContext";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import axios from "axios";
import { BOT_API_URL } from "../../constants";

const Activity = ({ activity }: { activity: TelegramUserActivity }) => {
  const {
    state: { user, contacts },
  } = useAppContext();

  const secondaryUserId =
    user?.userTelegramID === activity.senderTgId
      ? activity.recipientTgId
      : activity.senderTgId;

  const [secondaryUser, setSecondaryUser] = useState(
    contacts?.find((contact) => contact.id === secondaryUserId) || {}
  );

  const getUser = useCallback(async () => {
    if (!secondaryUserId) return;
    if (Object.keys(secondaryUser) && Object.keys(secondaryUser).length > 0)
      return;
    try {
      const res = await axios.get(
        `${BOT_API_URL}/v1/telegram/user?id=${secondaryUserId}`,
        {
          headers: {
            Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
          },
        }
      );

      setSecondaryUser(res.data || {});
    } catch (err) {
      setSecondaryUser({});
    }
  }, [secondaryUserId, secondaryUser]);

  const getAvatarText = () => {
    let avatarText = "";
    if (secondaryUser.firstName) {
      avatarText += secondaryUser.firstName.charAt(0).toUpperCase();
    }
    if (secondaryUser.lastName) {
      avatarText += secondaryUser.lastName.charAt(0).toUpperCase();
    }
    if (!avatarText && secondaryUser.username) {
      avatarText += secondaryUser.username.charAt(0).toUpperCase();
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
              <h5 style={{ margin: 0 }}>
                {user?.userTelegramID === activity.senderTgId
                  ? "Sent to"
                  : "Recieved from"}{" "}
                {secondaryUser.firstName || secondaryUser.lastName
                  ? `${secondaryUser.firstName}${
                      secondaryUser.lastName ? " " + secondaryUser.lastName : ""
                    }`
                  : secondaryUser.username
                  ? `@${secondaryUser.username}`
                  : secondaryUser.userName
                  ? secondaryUser.userName
                  : secondaryUser.userHandle
                  ? `@${secondaryUser.userHandle}`
                  : "Unknown user"}
              </h5>

              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: "12px",
                  opacity: "0.6",
                }}
              >
                {moment(activity.dateAdded).fromNow()}
              </p>
            </div>
          </div>
        }
        RightComponent={
          <div>
            <p style={{ fontSize: "12px", margin: 0 }}>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
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
