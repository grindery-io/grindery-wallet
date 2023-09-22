import React from "react";
import BottomNavigation from "../shared/BottomNavigation";
import AppHeader from "../shared/AppHeader";
import useAppContext from "../../hooks/useAppContext";
import { TelegramUserReward } from "../../types/Telegram";
import Reward from "../shared/Reward";

const RewardsPage = () => {
  const {
    state: { rewards },
  } = useAppContext();
  return (
    <>
      <AppHeader />
      <div
        style={{ width: "100%", padding: "0 16px", boxSizing: "border-box" }}
      >
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
              <span style={{ fontWeight: "normal", fontSize: "12px" }}>g¹</span>
            </p>
          </div>
          {rewards && rewards.length > 0 ? (
            <ul style={{ padding: 0, margin: 0 }}>
              {rewards.map((reward: TelegramUserReward) => (
                <Reward key={reward._id} reward={reward} />
              ))}
            </ul>
          ) : (
            <p
              style={{ margin: "50px 20px", textAlign: "center", opacity: 0.6 }}
            >
              You have no rewards.
            </p>
          )}
        </div>
      </div>

      <BottomNavigation />
    </>
  );
};

export default RewardsPage;
