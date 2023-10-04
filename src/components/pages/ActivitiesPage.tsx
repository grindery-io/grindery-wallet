import React, { useState } from "react";
import BottomNavigation from "../shared/BottomNavigation";
import AppHeader from "../shared/AppHeader";
import useAppContext from "../../hooks/useAppContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Box } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import Activity from "../shared/Activity";
import { useNavigate } from "react-router";
import SearchBox, { Filter } from "../shared/SearchBox";
import { TelegramUserActivity } from "../../types/Telegram";

const ActivitiesPage = () => {
  const { height } = useWindowDimensions();

  const {
    state: { user, activity, activityLoading, activityFilters },
    setState,
    getTgActivity,
  } = useAppContext();
  const [search, setSearch] = useState("");

  const applyFilters = (act: TelegramUserActivity) => {
    let res = false;
    if (
      activityFilters.includes("sent") &&
      act.senderTgId === user?.userTelegramID
    ) {
      res = true;
    }
    if (
      activityFilters.includes("received") &&
      act.recipientTgId === user?.userTelegramID
    ) {
      res = true;
    }

    return res;
  };

  const data = activity
    ?.filter(
      (act: TelegramUserActivity) =>
        !search ||
        (act.tokenSymbol &&
          act.tokenSymbol.toLowerCase().includes(search.toLowerCase())) ||
        (act.senderName &&
          act.senderName.toLowerCase().includes(search.toLowerCase())) ||
        (act.senderWallet &&
          act.senderWallet.toLowerCase().includes(search.toLowerCase())) ||
        (act.recipientWallet &&
          act.recipientWallet.toLowerCase().includes(search.toLowerCase()))
    )
    .filter((act) => (activityFilters.length > 0 ? applyFilters(act) : true));

  const options: Filter[] = [
    {
      key: "sent",
      label: "Sent",
      value: activityFilters.includes("sent"),
      type: "checkbox",
      isActive: activityFilters.includes("sent"),
      onChange: (value) => {
        setState({
          activityFilters: value
            ? [...activityFilters, "sent"]
            : activityFilters.filter((filter) => filter !== "sent"),
        });
      },
      count: activity?.filter((act) => act.senderTgId === user?.userTelegramID)
        .length,
    },
    {
      key: "received",
      label: "Received",
      value: activityFilters.includes("received"),
      type: "checkbox",
      isActive: activityFilters.includes("received"),
      onChange: (value) => {
        setState({
          activityFilters: value
            ? [...activityFilters, "received"]
            : activityFilters.filter((filter) => filter !== "received"),
        });
      },
      count: activity?.filter(
        (act) => act.recipientTgId === user?.userTelegramID
      ).length,
    },
  ];

  return (
    <>
      <AppHeader onRefresh={getTgActivity} refreshing={activityLoading} />
      <div style={{ width: "100%", padding: "0", boxSizing: "border-box" }}>
        <SearchBox
          placeholder="Activities"
          value={search}
          onChange={(e: string) => {
            setSearch(e);
          }}
          filters={options}
        />
        <div style={{ textAlign: "left" }}>
          <>
            {activity && activity.length > 0 ? (
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
                  {TransactionRenderer}
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
                You have no transactions.
              </p>
            )}
          </>
        </div>
      </div>

      <BottomNavigation />
    </>
  );
};

const TransactionRenderer = ({
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
      <Activity
        activity={data[index]}
        key={data[index]._id}
        onClick={() => {
          navigate(`/activities/${data[index]._id}`);
        }}
      />
    </div>
  );
};

export default ActivitiesPage;
