import React, { useCallback, useEffect, useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import { useNavigate, useParams } from "react-router";
import useBackButton from "../../hooks/useBackButton";
import AppHeader from "../shared/AppHeader";
import Title from "../shared/Title";
import TableRow from "../shared/TableRow";
import { TelegramUserContact } from "../../types/Telegram";
import { getSecondaryUserDisplayName } from "../../utils/getSecondaryUserDisplayName";
import ContactAvatar from "../shared/ContactAvatar";
import axios from "axios";
import { BOT_API_URL } from "../../constants";
import moment from "moment";
import Button from "../shared/Button";

const ActivityPage = () => {
  const navigate = useNavigate();
  useBackButton({ path: "/activities" });
  const {
    state: { activity, contacts, user },
  } = useAppContext();
  const { id } = useParams();

  const item = activity.find((item) => item._id === id);
  const contact = contacts?.find((contact: TelegramUserContact) =>
    item?.recipientTgId !== user?.userTelegramID
      ? contact.id === item?.recipientTgId
      : contact.id === item?.senderTgId
  );
  const [photo, setPhoto] = useState(
    localStorage.getItem("gr_wallet_contact_photo_" + contact?.id) || ""
  );

  const getPhoto = useCallback(async () => {
    if (!contact?.username) {
      return;
    }
    try {
      const res = await axios.get(
        `${BOT_API_URL}/v1/telegram/user/photo?username=${contact.username}`,
        {
          headers: {
            Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
          },
        }
      );
      setPhoto(res.data.photo || "");

      localStorage.setItem(
        "gr_wallet_contact_photo_" + contact.id,
        res.data.photo || "null"
      );
    } catch (err) {
      setPhoto("");
    }
  }, [contact]);

  useEffect(() => {
    if (!photo) {
      getPhoto();
    }
  }, [photo, getPhoto]);

  return item ? (
    <>
      <AppHeader />
      <div style={{ padding: "16px", width: "100%", boxSizing: "border-box" }}>
        <div
          style={{
            margin: "32px auto 24px",
            textAlign: "center",
          }}
        >
          <svg
            width="49"
            height="48"
            viewBox="0 0 49 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24.9395" cy="24" r="24" fill="#2AABEE" />
            <g clipPath="url(#clip0_1928_12130)">
              <path
                d="M12.7698 21.81C12.7159 21.81 12.6621 21.8041 12.6082 21.7921C12.2373 21.7023 12.0099 21.3314 12.0997 20.9664C13.2305 16.1559 17.0717 12.3206 21.8763 11.1838C22.2472 11.094 22.6182 11.3274 22.702 11.6924C22.7917 12.0633 22.5584 12.4343 22.1934 12.5181C17.8914 13.5352 14.4571 16.9696 13.4399 21.2716C13.3681 21.5887 13.0809 21.8041 12.7698 21.8041V21.81Z"
                fill="white"
              />
              <path
                d="M20.6975 16.7363C20.6077 16.7363 20.518 16.7184 20.4282 16.6825C20.0812 16.5329 19.9197 16.132 20.0633 15.779L21.6967 11.9557L17.8734 10.3223C17.5264 10.1727 17.3648 9.77181 17.5084 9.4188C17.658 9.07177 18.0649 8.91023 18.4119 9.05382L23.5036 11.2257L21.3317 16.3175C21.218 16.5807 20.9667 16.7363 20.6975 16.7363Z"
                fill="white"
              />
              <path
                d="M27.8476 36.8283C27.5364 36.8283 27.2552 36.6129 27.1774 36.2958C27.0877 35.9248 27.321 35.5539 27.686 35.4701C31.988 34.453 35.4224 31.0186 36.4395 26.7166C36.5293 26.3457 36.8942 26.1183 37.2652 26.208C37.6362 26.2978 37.8635 26.6688 37.7738 27.0337C36.637 31.8383 32.8017 35.6735 27.9972 36.8104C27.9433 36.8223 27.8895 36.8283 27.8356 36.8283H27.8476Z"
                fill="white"
              />
              <path
                d="M31.736 39C31.6462 39 31.5565 38.982 31.4667 38.9461L26.375 36.7742L28.5469 31.6825C28.6965 31.3354 29.1034 31.1739 29.4504 31.3175C29.7974 31.4671 29.959 31.868 29.8154 32.221L28.1819 36.0443L32.0052 37.6777C32.3523 37.8273 32.5138 38.2281 32.3702 38.5812C32.2565 38.8444 32.0052 39 31.736 39Z"
                fill="white"
              />
              <path
                d="M37.0797 21.78C36.7686 21.78 36.4874 21.5646 36.4096 21.2475C35.3924 16.9455 31.958 13.5111 27.6561 12.494C27.2851 12.4042 27.0578 12.0333 27.1475 11.6683C27.2373 11.2973 27.6022 11.07 27.9732 11.1597C32.7777 12.2965 36.613 16.1318 37.7498 20.9363C37.8396 21.3073 37.6062 21.6783 37.2412 21.762C37.1874 21.774 37.1335 21.78 37.0797 21.78Z"
                fill="white"
              />
              <path
                d="M37.7073 22.5642L32.6156 20.3923C32.2686 20.2427 32.107 19.8418 32.2506 19.4888C32.4002 19.1418 32.807 18.9802 33.1541 19.1238L36.9774 20.7572L38.6108 16.9339C38.7604 16.5869 39.1672 16.4254 39.5143 16.569C39.8613 16.7185 40.0228 17.1194 39.8792 17.4724L37.7073 22.5642Z"
                fill="white"
              />
              <path
                d="M22.0619 36.8578C22.0081 36.8578 21.9542 36.8518 21.9004 36.8398C17.0958 35.703 13.2606 31.8677 12.1237 27.0632C12.034 26.6922 12.2673 26.3213 12.6323 26.2375C13.0033 26.1478 13.3742 26.3811 13.458 26.7461C14.4752 31.048 17.9095 34.4824 22.2115 35.4996C22.5825 35.5893 22.8098 35.9603 22.7201 36.3253C22.6483 36.6424 22.3611 36.8578 22.0499 36.8578H22.0619Z"
                fill="white"
              />
              <path
                d="M10.628 31.4851C10.5382 31.4851 10.4485 31.4671 10.3587 31.4313C10.0117 31.2817 9.85017 30.8808 9.99377 30.5278L12.1657 25.436L17.2574 27.6139C17.6045 27.7635 17.766 28.1704 17.6224 28.5174C17.4728 28.8644 17.0719 29.032 16.7189 28.8824L12.8956 27.249L11.2622 31.0723C11.1485 31.3355 10.8972 31.4911 10.628 31.4911V31.4851Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_1928_12130">
                <rect
                  width="30"
                  height="30"
                  fill="white"
                  transform="translate(9.93945 9)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <Title style={{ marginBottom: "16px" }}>Transaction Details</Title>
        <div
          style={{
            borderRadius: "5px",
            border: "1px solid var(--grindery-cool-grey-cool-grey-10, #E3E3E8)",
            background: "var(--grindery-solids-white, #FFF)",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "flex-start",
            flexWrap: "nowrap",
            width: "100%",
          }}
        >
          <TableRow
            label={`Tokens ${
              item.recipientTgId !== user?.userTelegramID ? "sent" : "recieved"
            } `}
            value={item.tokenAmount}
            icon={
              <img
                src="/images/g1-token-red.svg"
                alt=""
                width="20"
                style={{ display: "inline-block" }}
              />
            }
          />

          <TableRow
            label={
              item.recipientTgId !== user?.userTelegramID
                ? "Recipient"
                : "Sender"
            }
            value={
              contact ? getSecondaryUserDisplayName(contact) : "Unknown user"
            }
            onValueClick={
              contact
                ? () => {
                    navigate(`/contacts/${contact.id}`);
                  }
                : undefined
            }
            icon={
              contact ? (
                photo && photo !== "null" ? (
                  <img
                    src={photo}
                    alt=""
                    style={{
                      width: "20px",
                      height: "20px",
                      display: "block",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <ContactAvatar
                    style={{
                      width: "20px",
                      height: "20px",
                      minWidth: "20px",
                      borderRadius: "50%",
                      fontSize: "1rem",
                    }}
                    contact={contact}
                  />
                )
              ) : null
            }
          />

          <TableRow
            label="Transaction sent date"
            value={moment(item.dateAdded).fromNow()}
            last={!item.transactionHash}
          />
          {item.transactionHash && (
            <TableRow
              label="Transaction hash"
              value={
                item.transactionHash.substring(0, 6) +
                "..." +
                item.transactionHash.substring(item.transactionHash.length - 4)
              }
              onValueClick={() => {
                if (window.Telegram?.WebApp?.openLink) {
                  window.Telegram.WebApp.openLink(
                    `https://polygonscan.com/tx/${item.transactionHash}`
                  );
                } else {
                  window.open(
                    `https://polygonscan.com/tx/${item.transactionHash}`,
                    "_blank"
                  );
                }
              }}
              icon={
                <svg
                  style={{ width: "12px", height: "12px", margin: "2px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.4009 1C15.4009 0.447715 15.8486 0 16.4009 0H23.0009C23.5532 0 24.0009 0.447715 24.0009 1V7.6C24.0009 8.15228 23.5532 8.6 23.0009 8.6C22.4486 8.6 22.0009 8.15228 22.0009 7.6V2H16.4009C15.8486 2 15.4009 1.55228 15.4009 1Z"
                    fill="#0B0D17"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23.708 0.292893C24.0985 0.683417 24.0985 1.31658 23.708 1.70711L9.04134 16.3738C8.65081 16.7643 8.01765 16.7643 7.62712 16.3738C7.2366 15.9832 7.2366 15.3501 7.62712 14.9596L22.2938 0.292893C22.6843 -0.0976311 23.3175 -0.0976311 23.708 0.292893Z"
                    fill="#0B0D17"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.000976562 6.86663C0.000976562 5.50433 1.10534 4.39996 2.46764 4.39996H11.2676C11.8199 4.39996 12.2676 4.84768 12.2676 5.39996C12.2676 5.95225 11.8199 6.39996 11.2676 6.39996H2.46764C2.20991 6.39996 2.00098 6.6089 2.00098 6.86663V21.5333C2.00098 21.791 2.20991 22 2.46764 22H17.1343C17.392 22 17.601 21.791 17.601 21.5333V12.7333C17.601 12.181 18.0487 11.7333 18.601 11.7333C19.1533 11.7333 19.601 12.181 19.601 12.7333V21.5333C19.601 22.8956 18.4966 24 17.1343 24H2.46764C1.10534 24 0.000976562 22.8956 0.000976562 21.5333V6.86663Z"
                    fill="#0B0D17"
                  />
                </svg>
              }
              last
            />
          )}
        </div>
        <div
          style={{
            marginTop: "16px",
          }}
        >
          <Button
            sx={{
              padding: "10px 20px !important",
              fontSize: "14px",
              width: "100%",
            }}
            fullWidth
            value="Close"
            variant="outlined"
            color="secondary"
            onClick={() => {
              navigate("/activities");
            }}
          />
        </div>
      </div>
    </>
  ) : null;
};

export default ActivityPage;
