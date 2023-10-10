import React, { useState } from "react";
import BottomNavigation from "../shared/BottomNavigation";
import useAppContext from "../../hooks/useAppContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Box, Typography } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import Reward from "../shared/Reward";
import { useNavigate } from "react-router";
import PendingReward from "../shared/PendingReward";
import ReferralReward from "../shared/ReferralReward";
import { TelegramUserActivity, TelegramUserReward } from "../../types/Telegram";
import SearchBox, { Filter } from "../shared/SearchBox";
import ReferralBanner from "../shared/ReferralBanner";

const RewardsPage = () => {
  const { height } = useWindowDimensions();

  const {
    state: { rewards, rewardsFilters },
    setState,
  } = useAppContext();

  const applyFilters = (d: TelegramUserActivity | TelegramUserReward) => {
    let res = false;
    if (
      rewardsFilters.includes("pending") &&
      !(d as TelegramUserReward).responsePath
    ) {
      res = true;
    }
    if (
      rewardsFilters.includes("received") &&
      (d as TelegramUserReward).responsePath
    ) {
      res = true;
    }

    return res;
  };

  const data = [...rewards.received, ...rewards.pending]
    .sort((a: any, b: any) => Date.parse(b.dateAdded) - Date.parse(a.dateAdded))
    .filter((d) => (rewardsFilters.length > 0 ? applyFilters(d) : true));
  const [search, setSearch] = useState("");

  const options: Filter[] = [
    {
      key: "pending",
      label: "Eligible for reward",
      value: rewardsFilters.includes("pending"),
      type: "checkbox",
      isActive: rewardsFilters.includes("pending"),
      onChange: (value) => {
        setState({
          rewardsFilters: value
            ? [...rewardsFilters, "pending"]
            : rewardsFilters.filter((filter) => filter !== "pending"),
        });
      },
      count: [...rewards.received, ...rewards.pending].filter(
        (d) => !(d as TelegramUserReward).responsePath
      ).length,
    },
    {
      key: "received",
      label: "Rewards received",
      value: rewardsFilters.includes("received"),
      type: "checkbox",
      isActive: rewardsFilters.includes("received"),
      onChange: (value) => {
        setState({
          rewardsFilters: value
            ? [...rewardsFilters, "received"]
            : rewardsFilters.filter((filter) => filter !== "received"),
        });
      },
      count: [...rewards.received, ...rewards.pending].filter(
        (d) => (d as TelegramUserReward).responsePath
      ).length,
    },
  ];

  return (
    <>
      <Box sx={{ width: "100%", padding: "0" }}>
        <SearchBox
          placeholder="Rewards"
          value={search}
          onChange={(e: string) => {
            setSearch(e);
          }}
          filters={options}
        />
        <Box sx={{ textAlign: "left" }}>
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
                  height={height - 120}
                  itemCount={data.length}
                  itemSize={68}
                  width="100%"
                  itemData={data}
                >
                  {ReceivedRewardRenderer}
                </List>
              </Box>
            ) : (
              <Typography
                sx={{ margin: "50px 20px", textAlign: "center" }}
                color="hint"
              >
                You have no rewards.
              </Typography>
            )}
          </>
        </Box>
      </Box>
      <ReferralBanner />
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
    <Box sx={style}>
      {data[index].responsePath ? (
        <>
          {!data[index].parentTransactionHash ? (
            <Reward
              reward={data[index]}
              key={data[index]._id}
              onClick={() => {
                navigate(`/rewards/${data[index]._id}`);
              }}
            />
          ) : (
            <ReferralReward
              reward={data[index]}
              key={data[index]._id}
              onClick={() => {
                navigate(`/rewards/${data[index]._id}`);
              }}
            />
          )}
        </>
      ) : (
        <PendingReward
          activity={data[index]}
          key={data[index]._id}
          onClick={() => {
            navigate(`/activities/${data[index]._id}`);
          }}
        />
      )}
    </Box>
  );
};

export default RewardsPage;
