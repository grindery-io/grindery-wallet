import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAppContext from "../../hooks/useAppContext";
import useBackButton from "../../hooks/useBackButton";
import {
  TelegramUserActivity,
  TelegramUserContact,
} from "../../types/Telegram";
import axios from "axios";
import { BOT_API_URL, ICONS, MAX_WIDTH } from "../../constants";
import ContactAvatar from "../shared/ContactAvatar";
import Button from "../shared/Button";
import styled from "styled-components";
import Activity from "../shared/Activity";

const ButtonWrapper = styled.div`
  box-sizing: border-box;
  padding: 16px;
  position: fixed;
  width: 100%;
  max-width: ${MAX_WIDTH};
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  background: var(--tg-theme-bg-color, #ffffff);

  & button {
    width: 100%;
    padding: 10px 20px !important;
    background: var(--tg-theme-button-color, #2481cc);
    color: var(--tg-theme-button-text-color, #ffffff);
    box-shadow: none;

    &:hover {
      box-shadow: none;
      background: var(--tg-theme-button-color, #2481cc);
      color: var(--tg-theme-button-text-color, #ffffff);
      opacity: 1;
    }
  }
  & button > span {
    padding: 0;
    background: transparent;

    & img {
      padding: 0;
      background: transparent;
      border: none;
    }
  }
`;

const ContactPage = () => {
  const navigate = useNavigate();
  useBackButton();
  const { id } = useParams();
  const contactId = id;
  const {
    state: { contacts, activity },
  } = useAppContext();
  const contact = (contacts || []).find(
    (contact: TelegramUserContact) => contact.id === contactId
  );
  const [photo, setPhoto] = useState(
    localStorage.getItem("gr_wallet_contact_photo_" + contact?.id) || ""
  );

  const contactActivity = activity.filter(
    (act: TelegramUserActivity) =>
      act.recipientTgId === contactId || act.senderTgId === contactId
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

  return (
    <>
      {contact && (
        <>
          <div
            style={{
              marginTop: "20px",
              position: "relative",
            }}
          >
            {photo && photo !== "null" ? (
              <img
                src={photo}
                alt=""
                style={{
                  width: "130px",
                  height: "130px",
                  display: "block",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <>
                {/*<Jazzicon diameter={36} seed={parseFloat(contact.id)} />*/}
                <ContactAvatar
                  style={{
                    width: "130px",
                    height: "130px",
                    minWidth: "130px",
                    borderRadius: "50%",
                    fontSize: "2.5rem",
                  }}
                  contact={contact}
                />
              </>
            )}
            {contact.isGrinderyUser && (
              <div
                style={{
                  position: "absolute",
                  bottom: "-4px",
                  right: "-4px",
                  border: "2px solid var(--tg-theme-bg-color, #ffffff)",
                  borderRadius: "50%",
                }}
              >
                <img
                  src="https://app.grindery.io/logo192.png"
                  alt=""
                  style={{ width: "32px", height: "32px", display: "block" }}
                />
              </div>
            )}
          </div>
          <div>
            <p
              style={{
                lineHeight: "1.5",
                fontSize: "16px",
                margin: 0,
                color: "var(--tg-theme-text-color, #000000)",
              }}
            >
              {contact.firstName || contact.lastName
                ? `${contact.firstName}${
                    contact.lastName ? " " + contact.lastName : ""
                  }`
                : `@${contact.username}`}
            </p>
          </div>

          {contactActivity && contactActivity.length > 0 && (
            <div style={{ width: "100%", paddingBottom: "76px" }}>
              <p
                style={{
                  margin: "0",
                  padding: "8px 16px 8px",
                  textAlign: "left",
                  position: "sticky",
                  top: "0px",
                  background: "var(--tg-theme-bg-color, #ffffff)",
                  zIndex: 1,
                }}
              >
                <span style={{ color: "var(--tg-theme-hint-color, #999999)" }}>
                  Activity
                </span>
              </p>
              {contactActivity.map((activity) => (
                <Activity
                  key={activity._id}
                  activity={activity}
                  onClick={() => {
                    navigate(`/activities/${activity._id}`);
                  }}
                />
              ))}
            </div>
          )}

          <ButtonWrapper>
            <Button
              variant="contained"
              color="secondary"
              icon={
                <img
                  src={ICONS.ARROW_OPEN}
                  alt=""
                  style={{ width: "16px", height: "16px", display: "block" }}
                />
              }
              fullWidth
              value="Send tokens"
              onClick={() => {
                navigate(`/send/${contactId}`);
              }}
              sx={{ width: "100%" }}
            />
          </ButtonWrapper>
        </>
      )}
    </>
  );
};

export default ContactPage;
