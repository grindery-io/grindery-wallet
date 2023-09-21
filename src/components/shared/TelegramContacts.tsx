import React from "react";
import DataBox from "./DataBox";
import useAppContext from "../../hooks/useAppContext";
import ContactAvatar from "./ContactAvatar";
import { CircularProgress, InputBase } from "@mui/material";

type Props = {
  onContactClick: (contact: any) => void;
};

const TelegramContacts = ({ onContactClick }: Props) => {
  const {
    state: { contacts, contactsLoading },
  } = useAppContext();
  const [search, setSearch] = React.useState("");

  return (
    <div style={{ textAlign: "left" }}>
      <div
        style={{
          padding: "16px 0 10px",
          background: "#fff",
          position: "sticky",
          top: "61px",
          width: "100%",
        }}
      >
        <InputBase
          name="search_contacts"
          placeholder="Contacts"
          startAdornment={<span style={{ marginRight: "8px" }}>🔍</span>}
          fullWidth
          sx={{
            padding: "9px 16px",
            borderRadius: "10px",
            background: "#F4F5F7",
            "& .MuiInputBase-input": {
              padding: 0,
            },
          }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      {contacts && contacts.length > 0 ? (
        <ul style={{ padding: 0, margin: 0 }}>
          {contacts
            .filter(
              (contact: any) =>
                !search ||
                (contact.username &&
                  contact.username
                    .toLowerCase()
                    .includes(search.toLowerCase())) ||
                (contact.firstName &&
                  contact.firstName
                    .toLowerCase()
                    .includes(search.toLowerCase())) ||
                (contact.lastName &&
                  contact.lastName.toLowerCase().includes(search.toLowerCase()))
            )
            .map((contact: any) => (
              <li
                key={contact.id}
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
                        {(contact.firstName || contact.lastName) &&
                        contact.username ? (
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
                />
              </li>
            ))}
        </ul>
      ) : contactsLoading ? (
        <div style={{ margin: "50px", textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <p style={{ margin: "20px" }}>Your contacts list is empty.</p>
      )}
    </div>
  );
};

export default TelegramContacts;
