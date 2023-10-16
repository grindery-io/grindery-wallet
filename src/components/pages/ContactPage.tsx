import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useBackButton from "../../hooks/useBackButton";
import { TelegramUserActivity } from "../../types/Telegram";
import { BOT_API_URL, ICONS, MAX_WIDTH } from "../../constants";
import Activity from "../shared/Activity";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import useAppUser from "../../hooks/useAppUser";
import UserAvatar from "../shared/UserAvatar";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const ContactPage = () => {
  const navigate = useNavigate();
  useBackButton();
  const { id } = useParams();
  const { user: contact } = useAppUser(id || "");

  const [activities, setActivities] = useState<TelegramUserActivity[]>([]);
  const [activitiesTotal, setActivitiesTotal] = useState(0);
  const [activitiesLoading, setActivitiesLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, [id, navigate]);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`${BOT_API_URL}/v2/userActivity/${id}?limit=15`, {
        signal: controller.signal,
        headers: {
          Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
        },
      })

      .then((res) => {
        setActivities(res.data?.docs || []);
        setActivitiesTotal(res.data?.total || 0);
        setActivitiesLoading(false);
      })
      .catch((err) => {
        //
      });

    return () => {
      controller.abort();
    };
  }, [id]);

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
          {activitiesLoading && (
            <Box sx={{ textAlign: "center", marginTop: "24px" }}>
              <CircularProgress
                size="20px"
                style={{
                  color: "var(--tg-theme-button-color, #2481cc)",
                }}
              />
            </Box>
          )}

          {!activitiesLoading && activities.length < 1 && (
            <Typography
              sx={{
                margin: "50px 20px 80px",
                textAlign: "center",
              }}
              color="hint"
            >
              Invite your friends and earn rewards
              <br />
              <br />
              Send tokens to {contact.name} and then follow the instructions
              provided by the GrinderyAI bot
              <br />
              <br />
              <span style={{ fontSize: "22px" }}>👇</span>
            </Typography>
          )}

          {!activitiesLoading && activities && activities.length > 0 && (
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
              {/*activities.map((activity) => (
                <Activity
                  key={activity._id}
                  activity={activity}
                  onClick={() => {
                    navigate(`/activities/${activity._id}`);
                  }}
                />
                ))*/}
              <InfiniteScroll
                dataLength={activities.length}
                next={async () => {
                  try {
                    const res = await axios.get(
                      `${BOT_API_URL}/v2/userActivity/${id}?limit=15&skip=${activities.length}`,
                      {
                        headers: {
                          Authorization:
                            "Bearer " + window.Telegram?.WebApp?.initData,
                        },
                      }
                    );
                    setActivities((_activities) => [
                      ..._activities,
                      ...(res.data?.docs || []),
                    ]);
                    setActivitiesTotal(res.data?.total || 0);
                  } catch (error) {
                    console.error("get more activity error: ", error);
                  }
                }}
                hasMore={activities.length < activitiesTotal}
                loader={
                  <Box sx={{ textAlign: "center", marginTop: "16px" }}>
                    <CircularProgress
                      size="20px"
                      style={{
                        color: "var(--tg-theme-button-color, #2481cc)",
                      }}
                    />
                  </Box>
                }
              >
                {activities.map((activity: TelegramUserActivity) => (
                  <Activity
                    activity={activity}
                    key={activity._id}
                    onClick={() => {
                      navigate(`/activities/${activity._id}`);
                    }}
                  />
                ))}
              </InfiniteScroll>
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
