import React, { useState } from "react";
import BottomNavigation from "../shared/BottomNavigation";
import AppHeader from "../shared/AppHeader";
import useAppContext from "../../hooks/useAppContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Box } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import Reward from "../shared/Reward";
import { useNavigate } from "react-router";
import PendingReward from "../shared/PendingReward";
import ReferralReward from "../shared/ReferralReward";
import { TelegramUserActivity, TelegramUserReward } from "../../types/Telegram";
import SearchBox, { Filter } from "../shared/SearchBox";

const RewardsPage = () => {
  const { height } = useWindowDimensions();

  const {
    state: { rewards, rewardsLoading },
    getTgRewards,
  } = useAppContext();

  const [filters, setFilters] = useState<string[]>([]);

  const applyFilters = (d: TelegramUserActivity | TelegramUserReward) => {
    let res = false;
    if (
      filters.includes("pending") &&
      !(d as TelegramUserReward).responsePath
    ) {
      res = true;
    }
    if (
      filters.includes("received") &&
      (d as TelegramUserReward).responsePath
    ) {
      res = true;
    }

    return res;
  };

  const data = [...rewards.received, ...rewards.pending]
    .sort((a: any, b: any) => Date.parse(b.dateAdded) - Date.parse(a.dateAdded))
    .filter((d) => (filters.length > 0 ? applyFilters(d) : true));
  const [search, setSearch] = useState("");

  const options: Filter[] = [
    {
      key: "pending",
      label: "Eligible for reward",
      value: filters.includes("pending"),
      type: "checkbox",
      isActive: filters.includes("pending"),
      onChange: (value) => {
        setFilters((filters) => {
          if (value) {
            return [...filters, "pending"];
          } else {
            return filters.filter((filter) => filter !== "pending");
          }
        });
      },
      count: data?.filter((d) => !(d as TelegramUserReward).responsePath)
        .length,
    },
    {
      key: "received",
      label: "Rewards received",
      value: filters.includes("received"),
      type: "checkbox",
      isActive: filters.includes("received"),
      onChange: (value) => {
        setFilters((filters) => {
          if (value) {
            return [...filters, "received"];
          } else {
            return filters.filter((filter) => filter !== "received");
          }
        });
      },
      count: data?.filter((d) => (d as TelegramUserReward).responsePath).length,
    },
  ];

  return (
    <>
      <AppHeader onRefresh={getTgRewards} refreshing={rewardsLoading} />
      <div style={{ width: "100%", padding: "0", boxSizing: "border-box" }}>
        <SearchBox
          placeholder="Rewards"
          value={search}
          onChange={(e: string) => {
            setSearch(e);
          }}
          filters={options}
        />
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
                  height={height - 176}
                  itemCount={data.length}
                  itemSize={68}
                  width="100%"
                  itemData={data}
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
    </div>
  );
};

export default RewardsPage;
