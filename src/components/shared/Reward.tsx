import React from "react";
import { TelegramUserReward } from "../../context/AppContext";
import DataBox from "./DataBox";
import moment from "moment";

const Reward = ({ reward }: { reward: TelegramUserReward }) => {
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
            ></div>
            <div>
              <h5 style={{ margin: 0 }}>{reward.message}</h5>

              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: "12px",
                  opacity: "0.6",
                }}
              >
                {moment(reward.dateAdded).fromNow()}
              </p>
            </div>
          </div>
        }
        RightComponent={
          <div>
            <p style={{ fontSize: "12px", margin: 0 }}>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                {reward.amount}
              </span>{" "}
              g1
            </p>
          </div>
        }
      />
    </li>
  );
};

export default Reward;
