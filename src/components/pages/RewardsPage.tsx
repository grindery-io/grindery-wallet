import React from "react";
import BottomNavigation from "../shared/BottomNavigation";
import AppHeader from "../shared/AppHeader";
import useAppContext from "../../hooks/useAppContext";
import Reward from "../shared/Reward";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { FixedSizeList as List } from "react-window";
import { Box } from "@mui/material";
import { formatBalance } from "../../utils/formatBalance";

const RewardsPage = () => {
  const {
    state: { rewards, rewardsLoading },
    getTgRewards,
  } = useAppContext();
  const { height } = useWindowDimensions();
  const { formatted } = formatBalance(
    rewards
      .map((reward) => parseFloat(reward.amount))
      .reduce((partialSum, a) => partialSum + a, 0)
  );
  return (
    <>
      <AppHeader onRefresh={getTgRewards} refreshing={rewardsLoading} />
      <div style={{ width: "100%", boxSizing: "border-box" }}>
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              padding: "0 16px",
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
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                flexDirection: "row",
                gap: "6px",
              }}
            >
              {formatted}{" "}
              <img
                src="/images/g1-token-red.svg"
                alt=""
                width="16"
                style={{ display: "inline-block" }}
              />
            </p>
          </div>

          {rewards && rewards.length > 0 ? (
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
                height={height - 160}
                itemCount={rewards.length}
                itemSize={68}
                width="100%"
                itemData={rewards}
              >
                {ItemRenderer}
              </List>
            </Box>
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

const ItemRenderer = ({
  data,
  index,
  style,
}: {
  data: any;
  index: number;
  style: any;
}) => {
  return (
    <div style={style}>
      <Reward reward={data[index]} />
    </div>
  );
};

export default RewardsPage;
