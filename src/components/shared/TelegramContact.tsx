import React from "react";
import DataBox from "./DataBox";
import ContactAvatar from "./ContactAvatar";
import { TelegramUserContact } from "../../types/Telegram";

type Props = {
  contact: TelegramUserContact;
  onContactClick: (contact: TelegramUserContact) => void;
};

const TelegramContact = ({ contact, onContactClick }: Props) => {
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
            <ContactAvatar contact={contact} />
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
