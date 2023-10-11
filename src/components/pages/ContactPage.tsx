import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useAppContext from "../../hooks/useAppContext";
import useBackButton from "../../hooks/useBackButton";
import { TelegramUserActivity } from "../../types/Telegram";
import { ICONS, MAX_WIDTH } from "../../constants";
import Activity from "../shared/Activity";
import { Box, Button, Typography } from "@mui/material";
import useAppUser from "../../hooks/useAppUser";
import UserAvatar from "../shared/UserAvatar";

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

          <Box
            sx={{
              padding: "16px",
              position: "fixed",
              width: "100%",
              maxWidth: MAX_WIDTH,
              zIndex: 2,
              left: "50%",
              transform: "translateX(-50%)",
              bottom: 0,
              //background: "var(--tg-theme-bg-color, #ffffff)",
            }}
          >
            <Button
              startIcon={
                <img
                  src={ICONS.ARROW_OPEN}
                  alt=""
                  style={{ width: "16px", height: "16px", display: "block" }}
                />
              }
              fullWidth
              onClick={() => {
                setTimeout(() => {
                  navigate(`/send/${id}`);
                }, 150);
              }}
              sx={{
                boxShadow:
                  "5px 5px 20px 0px var(--gr-theme-button-shadow-color)",
              }}
            >
              Send tokens
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default ContactPage;
