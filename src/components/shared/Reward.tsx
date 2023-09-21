import React from "react";
import DataBox from "./DataBox";
import moment from "moment";
import { TelegramUserReward } from "../../types/Telegram";

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
                width: "36px",
                height: "36px",
                minWidth: "36px",
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                background: "#898989",
                color: "#fff",
              }}
            ></div>
            <div>
              <p
                style={{
                  lineHeight: "1.5",
                  fontSize: "12px",
                  margin: 0,
                }}
              >
                {reward.message}
              </p>

              <p
                style={{
                  margin: "0",
                  fontSize: "12px",
                  opacity: "0.6",
                  lineHeight: "1.5",
                }}
              >
                {moment(reward.dateAdded).fromNow()}
              </p>
            </div>
          </div>
        }
        RightComponent={
          <div>
            <p style={{ fontSize: "10px", margin: 0 }}>
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>
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
