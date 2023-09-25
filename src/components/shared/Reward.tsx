import React from "react";
import DataBox from "./DataBox";
import moment from "moment";
import { TelegramUserReward } from "../../types/Telegram";
import { formatBalance } from "../../utils/formatBalance";

const Reward = ({ reward }: { reward: TelegramUserReward }) => {
  const { formatted } = formatBalance(parseFloat(reward.amount));
  return (
    <li
      style={{
        listStyleType: "none",
        padding: 0,
        margin: "10px 16px 0",
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
                backgroundColor: "#898989",
                //backgroundImage: "url(/images/g1-token-red.svg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
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
            <p
              style={{
                fontSize: "10px",
                margin: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                flexDirection: "row",
                gap: "6px",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                {formatted}
              </span>{" "}
              <img
                src="/images/g1-token-red.svg"
                alt=""
                width="16"
                style={{ display: "inline-block" }}
              />
            </p>
          </div>
        }
      />
    </li>
  );
};

export default Reward;
