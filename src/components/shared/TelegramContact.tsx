import React, { useCallback, useEffect, useState } from "react";
import DataBox from "./DataBox";
import { TelegramUserContact } from "../../types/Telegram";
import ContactAvatar from "./ContactAvatar";
import { BOT_API_URL } from "../../constants";
import axios from "axios";
import CheckIcon from "../icons/CheckIcon";

type Props = {
  contact: TelegramUserContact;
  onContactClick: (contact: TelegramUserContact) => void;
};

const TelegramContact = ({ contact, onContactClick }: Props) => {
  const [photo, setPhoto] = useState(
    localStorage.getItem("gr_wallet_contact_photo_" + contact.id) || ""
  );

  const getPhoto = useCallback(async () => {
    if (!contact.username) {
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

  return (
    <li
      style={{
        listStyleType: "none",
        padding: 0,
        margin: "10px 16px 0",
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
                position: "relative",
              }}
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
                <>
                  {/*<Jazzicon diameter={36} seed={parseFloat(contact.id)} />*/}
                  <ContactAvatar contact={contact} />
                </>
              )}
              {contact.isGrinderyUser && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-6px",
                    right: "-6px",
                    border: "2px solid var(--White, #FFF)",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src="https://app.grindery.io/logo192.png"
                    alt=""
                    style={{ width: "16px", height: "16px", display: "block" }}
                  />
                </div>
              )}
            </div>
            <div>
              <p
                style={{
                  lineHeight: "1.5",
                  fontSize: "12px",
                  margin: 0,
                }}
              >
                {contact.firstName || contact.lastName
                  ? `${contact.firstName}${
                      contact.lastName ? " " + contact.lastName : ""
                    }`
                  : `@${contact.username}`}
              </p>
              {(contact.firstName || contact.lastName) && contact.username ? (
                <p
                  style={{
                    lineHeight: "1.5",
                    margin: "0",
                    fontSize: "12px",
                    color: "#898989",
                  }}
                >
                  @{contact.username}
                </p>
              ) : null}
            </div>
          </div>
        }
        onClick={() => {
          onContactClick(contact);
        }}
        RightComponent={
          contact.isInvited ? (
            <div style={{ position: "relative", top: "-6px" }}>
              <CheckIcon />
            </div>
          ) : undefined
        }
      />
    </li>
  );
};

export default TelegramContact;
