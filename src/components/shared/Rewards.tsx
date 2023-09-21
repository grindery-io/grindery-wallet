import React from "react";
import useAppContext from "../../hooks/useAppContext";
import Reward from "./Reward";
import { TelegramUserReward } from "../../types/Telegram";

const Rewards = () => {
  const {
    state: { rewards },
  } = useAppContext();

  return (
    <div style={{ width: "100%" }}>
      <div style={{ textAlign: "left" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "nowrap",
            flexDirection: "row",
            gap: "16px",
            margin: "16px 0 10px",
          }}
        >
          <p style={{ margin: "0 0 0 9px", opacity: 0.6 }}>Total:</p>
          <p
            style={{
              margin: "0 0 0 auto",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "0 9px 0 0",
            }}
          >
            {rewards
              .map((reward) => parseFloat(reward.amount))
              .reduce((partialSum, a) => partialSum + a, 0)}{" "}
            <span style={{ fontWeight: "normal", fontSize: "12px" }}>g1</span>
          </p>
        </div>
        {rewards && rewards.length > 0 ? (
          <ul style={{ padding: 0, margin: 0 }}>
            {rewards.map((reward: TelegramUserReward) => (
              <Reward key={reward._id} reward={reward} />
            ))}
          </ul>
        ) : (
          <p style={{ margin: "20px" }}>You have no rewards.</p>
        )}
      </div>
    </div>
  );
};

export default Rewards;
