import React, { useCallback, useEffect, useState } from "react";
import DataBox from "./DataBox";
import { TelegramUserContact } from "../../types/Telegram";
import ContactAvatar from "./ContactAvatar";
import { BOT_API_URL } from "../../constants";
import axios from "axios";

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
        margin: "10px 0 0",
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
          contact.isGrinderyUser ? (
            <div>
              <img
                src="https://app.grindery.io/logo192.png"
                alt=""
                style={{ width: "20px", height: "20px", display: "block" }}
              />
            </div>
          ) : undefined
        }
      />
    </li>
  );
};

export default TelegramContact;
