import React from "react";
import { Typography } from "@mui/material";
import useAppContext from "../../hooks/useAppContext";
import { TelegramUserActivity } from "../../context/AppContext";
import DataBox from "./DataBox";
import moment from "moment";

const Activity = () => {
  const {
    state: { activity, user },
  } = useAppContext();
  console.log("activity", activity);

  return (
    <div style={{ width: "100%" }}>
      <Typography
        variant="h6"
        sx={{
          margin: "0 0 8px",
          padding: "0 0 2px",
          textAlign: "left",
          position: "sticky",
          top: "61px",
          background: "#fff",
          zIndex: 1,
        }}
      >
        Activity
      </Typography>
      <div style={{ textAlign: "left" }}>
        {activity && activity.length > 0 ? (
          <ul style={{ padding: 0, margin: 0 }}>
            {activity.map((activity: TelegramUserActivity) => (
              <li
                key={activity._id}
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
                        {/* ICON RECEIVE OR SEND */}
                      </div>
                      <div>
                        <h5 style={{ margin: 0 }}>
                          {activity.tokenAmount} {activity.tokenSymbol}
                        </h5>

                        <p
                          style={{
                            margin: "8px 0 0",
                            fontSize: "12px",
                            opacity: "0.6",
                          }}
                        >
                          {user?._id === activity.senderTgId
                            ? activity.recipientTgId
                            : activity.senderTgId}
                        </p>
                      </div>
                    </div>
                  }
                  RightComponent={
                    <div>
                      <p
                        style={{ opacity: "0.5", fontSize: "12px", margin: 0 }}
                      >
                        {moment(activity.dateAdded).fromNow()}
                      </p>
                    </div>
                  }
                />
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: "20px" }}>You have no transactions.</p>
        )}
      </div>
    </div>
  );
};

export default Activity;
