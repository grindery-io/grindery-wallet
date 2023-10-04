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
  TelegramUserContact,
  TelegramUserReward,
} from "../../types/Telegram";
import { formatBalance } from "../../utils/formatBalance";
import { useNavigate } from "react-router";

type Props = {
  reward: TelegramUserReward;
  onClick?: () => void;
  onAvatarClick?: () => void;
};

const ReferralReward = ({ reward, onClick, onAvatarClick }: Props) => {
  const navigate = useNavigate();
  const {
    state: { user, contacts, activity: activities },
  } = useAppContext();

  const activity = activities.find(
    (act) => act.TxId === reward.parentTransactionHash
  );

  const secondaryUserId =
    user?.userTelegramID === activity?.senderTgId
      ? activity?.recipientTgId
      : activity?.senderTgId;

  const [secondaryUser, setSecondaryUser] = useState<
    TelegramUserContact | TelegramUser | undefined
  >(contacts?.find((contact) => contact.id === secondaryUserId));

  const [photo, setPhoto] = useState(
    localStorage.getItem("gr_wallet_contact_photo_" + secondaryUserId) || ""
  );
  const { formatted } = formatBalance(parseFloat(reward.amount));

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
                    `https://polygonscan.com/tx/${activity?.transactionHash}`
                  );
                } else {
                  window.open(
                    `https://polygonscan.com/tx/${activity?.transactionHash}`,
                    "_blank"
                  );
                }
              }
        }
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
                  background: "#ffffff",
                  padding: "2px",
                }}
              >
                {user?.userTelegramID === activity?.senderTgId ? (
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
                Referral reward
              </p>

              <p
                style={{
                  margin: "0",
                  fontSize: "12px",
                  opacity: "0.6",
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
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>
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
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "var(--flow-status-success-success-50-base, #00B674)",
                }}
              >
                Received {moment(reward?.dateAdded).fromNow()}
              </span>
              <svg
                style={{ width: "12px", height: "12px" }}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10.5297 0.26053L11.2896 1.2462C11.4937 1.51107 11.8628 1.58489 12.1537 1.41989L13.2349 0.798958C13.617 0.58185 14.099 0.781589 14.2162 1.20278L14.5419 2.40556C14.6287 2.73122 14.9414 2.93964 15.2757 2.89622L16.5132 2.73556C16.9475 2.67911 17.3209 3.0482 17.2644 3.48676L17.1038 4.72427C17.0604 5.05862 17.2688 5.37125 17.5944 5.4581L18.7972 5.78376C19.2228 5.89666 19.4225 6.38298 19.201 6.76509L18.5801 7.84629C18.4108 8.13721 18.4846 8.5063 18.7538 8.71038L19.7395 9.47026C20.0868 9.73947 20.0868 10.2649 19.7395 10.5297L18.7538 11.2896C18.4889 11.4937 18.4151 11.8628 18.5801 12.1537L19.201 13.2349C19.4181 13.617 19.2184 14.099 18.7972 14.2162L17.5944 14.5419C17.2688 14.6287 17.0604 14.9414 17.1038 15.2757L17.2644 16.5132C17.3209 16.9475 16.9518 17.3209 16.5132 17.2644L15.2757 17.1038C14.9414 17.0604 14.6287 17.2688 14.5419 17.5944L14.2162 18.7972C14.1033 19.2228 13.617 19.4225 13.2349 19.201L12.1537 18.5801C11.8628 18.4108 11.4937 18.4846 11.2896 18.7538L10.5297 19.7395C10.2605 20.0868 9.73513 20.0868 9.47026 19.7395L8.71038 18.7538C8.5063 18.4889 8.13721 18.4151 7.84629 18.5801L6.76509 19.201C6.38298 19.4182 5.901 19.2184 5.78376 18.7972L5.4581 17.5944C5.37125 17.2688 5.05862 17.0604 4.72427 17.1038L3.48676 17.2644C3.05254 17.3209 2.67911 16.9518 2.73556 16.5132L2.89622 15.2757C2.93964 14.9414 2.73122 14.6287 2.40556 14.5419L1.20278 14.2162C0.777247 14.1033 0.577508 13.617 0.798958 13.2349L1.41989 12.1537C1.58923 11.8628 1.51541 11.4937 1.2462 11.2896L0.26053 10.5297C-0.0868432 10.2605 -0.0868432 9.73513 0.26053 9.47026L1.2462 8.71038C1.51107 8.5063 1.58489 8.13721 1.41989 7.84629L0.798958 6.76509C0.58185 6.38298 0.781589 5.901 1.20278 5.78376L2.40556 5.4581C2.73122 5.37125 2.93964 5.05862 2.89622 4.72427L2.73556 3.48676C2.67911 3.05254 3.0482 2.67911 3.48676 2.73556L4.72427 2.89622C5.05862 2.93964 5.37125 2.73122 5.4581 2.40556L5.78376 1.20278C5.89666 0.777247 6.38298 0.577508 6.76509 0.798958L7.84629 1.41989C8.13721 1.58923 8.5063 1.51541 8.71038 1.2462L9.47026 0.26053C9.73947 -0.0868432 10.2649 -0.0868432 10.5297 0.26053Z"
                  fill="#00B674"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.6905 7.47553C13.9159 7.63109 13.962 7.92588 13.7935 8.13394L10.1859 12.5866C9.97923 12.8414 9.66269 13.0013 9.31835 13.0239C8.97402 13.0465 8.63639 12.9296 8.3928 12.7042C8.39278 12.7042 8.39281 12.7042 8.3928 12.7042L6.22792 10.701C6.02912 10.5171 6.02955 10.2192 6.22888 10.0358C6.42821 9.8523 6.75095 9.8527 6.94975 10.0367L9.11463 12.0398C9.14957 12.0722 9.1976 12.0886 9.24614 12.0855C9.29464 12.0823 9.33976 12.0598 9.36957 12.0231C9.36954 12.0231 9.3696 12.0231 9.36957 12.0231L12.977 7.57058C13.1456 7.36252 13.465 7.31996 13.6905 7.47553Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
        }
      />
    </li>
  );
};

export default ReferralReward;
