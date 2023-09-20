import React from "react";
import { Typography } from "@mui/material";
import { TelegramUserReward } from "../../context/AppContext";
import useAppContext from "../../hooks/useAppContext";
import Reward from "./Reward";

const Rewards = () => {
  const {
    state: { rewards },
  } = useAppContext();

  return (
    <div style={{ width: "100%" }}>
      <Typography
        variant="h6"
        sx={{
          margin: "16px 0",
          padding: "0",
          textAlign: "center",
          position: "sticky",
          top: "0px",
          background: "#fff",
          zIndex: 1,
          width: "100%",
        }}
      >
        Rewards
      </Typography>
      <div style={{ textAlign: "left" }}>
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
