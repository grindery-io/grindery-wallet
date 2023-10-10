import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useAppContext from "../../hooks/useAppContext";
import useBackButton from "../../hooks/useBackButton";
import { TelegramUserActivity } from "../../types/Telegram";
import { ICONS, MAX_WIDTH } from "../../constants";
import Button from "../shared/Button";
import styled from "styled-components";
import Activity from "../shared/Activity";
import { Box, Typography } from "@mui/material";
import useAppUser from "../../hooks/useAppUser";
import UserAvatar from "../shared/UserAvatar";

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
  const { user: contact } = useAppUser(id || "");

  const {
    state: { activity },
  } = useAppContext();

  const contactActivity = activity.filter(
    (act: TelegramUserActivity) =>
      act.recipientTgId === id || act.senderTgId === id
  );

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, [id, navigate]);

  return (
    <>
      {contact && (
        <>
          <Box
            sx={{
              marginTop: "20px",
              position: "relative",
            }}
          >
            <UserAvatar user={contact} size={130} />

            {contact.isGrinderyUser && (
              <Box
                sx={{
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
              </Box>
            )}
          </Box>
          <Box>
            <Typography variant="subtitle">{contact.name}</Typography>
          </Box>

          {contactActivity && contactActivity.length > 0 && (
            <Box sx={{ width: "100%", paddingBottom: "76px" }}>
              <Box
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
                <Typography color="hint">Activity</Typography>
              </Box>
              {contactActivity.map((activity) => (
                <Activity
                  key={activity._id}
                  activity={activity}
                  onClick={() => {
                    navigate(`/activities/${activity._id}`);
                  }}
                />
              ))}
            </Box>
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
                navigate(`/send/${id}`);
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
