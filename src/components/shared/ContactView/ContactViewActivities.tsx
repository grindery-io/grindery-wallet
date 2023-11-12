import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TelegramUserActivity } from "../../../types/Telegram";
import ActivityListItem from "../ActivityListItem/ActivityListItem";
import { Box, CircularProgress, Typography } from "@mui/material";
import { AppUser } from "../../../hooks/useAppUser";
import InfiniteScroll from "react-infinite-scroll-component";
import { getUserActivityRequest } from "../../../services/activity";

const ContactViewActivities = ({ contact }: { contact: AppUser }) => {
  const navigate = useNavigate();

  const [activities, setActivities] = useState<TelegramUserActivity[]>([]);
  const [activitiesTotal, setActivitiesTotal] = useState(0);
  const [activitiesLoading, setActivitiesLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    getUserActivityRequest(contact.id, 0, controller)
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
  }, [contact.id]);

  return (
    <>
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

      {!activitiesLoading &&
        activities.length < 1 &&
        !contact.isGrinderyUser && (
          <Typography
            sx={{
              margin: "16px 16px 80px",
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

          <InfiniteScroll
            dataLength={activities.length}
            next={async () => {
              try {
                const res = await getUserActivityRequest(
                  contact.id,
                  activities.length
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
              <ActivityListItem
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
    </>
  );
};

export default ContactViewActivities;
