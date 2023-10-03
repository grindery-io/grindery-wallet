import React from "react";
import BottomNavigation from "../shared/BottomNavigation";
import AppHeader from "../shared/AppHeader";
import useAppContext from "../../hooks/useAppContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Box } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import Reward from "../shared/Reward";
import { useNavigate } from "react-router";

const RewardsPage = () => {
  const { height } = useWindowDimensions();

  const {
    state: { rewards, rewardsLoading },
    getTgRewards,
  } = useAppContext();

  return (
    <>
      <AppHeader onRefresh={getTgRewards} refreshing={rewardsLoading} />
      <div style={{ width: "100%", padding: "0", boxSizing: "border-box" }}>
        <div style={{ textAlign: "left" }}>
          <>
            {rewards.received.length > 0 ? (
              <Box
                sx={{
                  "& > div": {
                    padding: "0 0 10px",
                    boxSizing: "border-box",
                    "& > div": {
                      padding: "0 0 10px",
                      boxSizing: "border-box",
                    },
                  },
                }}
              >
                <List
                  height={height - 112}
                  itemCount={rewards.received.length}
                  itemSize={68}
                  width="100%"
                  itemData={rewards.received}
                >
                  {ReceivedRewardRenderer}
                </List>
              </Box>
            ) : (
              <p
                style={{
                  margin: "50px 20px",
                  textAlign: "center",
                  opacity: 0.6,
                }}
              >
                You have no rewards.
              </p>
            )}
          </>
        </div>
      </div>

      <BottomNavigation />
    </>
  );
};

const ReceivedRewardRenderer = ({
  data,
  index,
  style,
}: {
  data: any;
  index: number;
  style: any;
}) => {
  const navigate = useNavigate();
  return (
    <div style={style}>
      <Reward
        reward={data[index]}
        key={data[index]._id}
        onClick={() => {
          navigate(`/rewards/${data[index]._id}`);
        }}
      />
    </div>
  );
};

export default RewardsPage;
