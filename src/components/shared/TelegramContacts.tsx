import React from "react";
import DataBox from "./DataBox";
import useAppContext from "../../hooks/useAppContext";

type Props = {
  onContactClick: (contact: any) => void;
};

const TelegramContacts = ({ onContactClick }: Props) => {
  const {
    state: { contacts },
  } = useAppContext();

  const getAvatarText = (contact: any) => {
    let avatarText = "";
    if (contact.firstName) {
      avatarText += contact.firstName.charAt(0).toUpperCase();
    }
    if (contact.lastName) {
      avatarText += contact.lastName.charAt(0).toUpperCase();
    }
    if (!avatarText && contact.username) {
      avatarText += contact.username.charAt(0).toUpperCase();
    }
    return avatarText || "U";
  };

  return (
    <div style={{ textAlign: "left" }}>
      {contacts && contacts.length > 0 ? (
        <ul style={{ padding: 0, margin: 0 }}>
          {contacts.map((contact: any) => (
            <li
              key={contact.id}
              style={{ listStyleType: "none", padding: 0, margin: "0 0 10px" }}
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
                        width: "42px",
                        height: "42px",
                        minWidth: "42px",
                        borderRadius: "21px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        background: "#f5f5f5",
                      }}
                    >
                      {getAvatarText(contact)}
                    </div>
                    <div>
                      <h5 style={{ margin: 0 }}>
                        {contact.firstName || contact.lastName
                          ? `${contact.firstName}${
                              contact.lastName ? " " + contact.lastName : ""
                            }`
                          : `@${contact.username}`}
                      </h5>
                      {(contact.firstName || contact.lastName) &&
                      contact.username ? (
                        <p
                          style={{
                            margin: "8px 0 0",
                            fontSize: "12px",
                            opacity: "0.6",
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
              />
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ margin: "20px" }}>Your contacts list is empty.</p>
      )}
    </div>
  );
};

export default TelegramContacts;
