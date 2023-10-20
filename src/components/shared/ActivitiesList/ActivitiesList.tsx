import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";
import SearchBox, { Filter } from "../../shared/SearchBox";
import LeaderboardBanner from "../LeaderboardBanner";
import { debounce } from "lodash";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import ActivitiesListEmpty from "./ActivitiesListEmpty";
import ActivitiesListItems from "./ActivitiesListItems";

/**
 * Activities list component
 * @since 0.3.16
 * @returns React function component
 */
const ActivitiesList = () => {
  const dispatch = useAppDispatch();
  const { user, debug, activity } = useAppSelector(selectAppStore);
  const { items, filters } = activity;
  const [search, setSearch] = useState("");

  const options: Filter[] = [
    {
      key: "sent",
      label: "Sent",
      value: filters.includes("sent"),
      type: "checkbox",
      isActive: filters.includes("sent"),
      onChange: (value) => {
        dispatch(
          appStoreActions.setActivity({
            filters: value
              ? [...filters, "sent"]
              : filters.filter((filter: any) => filter !== "sent"),
          })
        );
      },
      count: items?.filter((act) => act.senderTgId === user?.userTelegramID)
        .length,
    },
    {
      key: "received",
      label: "Received",
      value: filters.includes("received"),
      type: "checkbox",
      isActive: filters.includes("received"),
      onChange: (value) => {
        dispatch(
          appStoreActions.setActivity({
            filters: value
              ? [...filters, "received"]
              : filters.filter((filter: any) => filter !== "received"),
          })
        );
      },
      count: items?.filter(
        (act: any) => act.recipientTgId === user?.userTelegramID
      ).length,
    },
  ];

  const request = debounce((value) => {
    dispatch(
      appStoreActions.setActivity({
        find: value
          ? [
              {
                $or: [
                  {
                    recipientWallet: { $regex: value, $options: "i" },
                  },
                  {
                    senderWallet: { $regex: value, $options: "i" },
                  },
                  {
                    transactionHash: { $regex: value, $options: "i" },
                  },
                  {
                    senderName: { $regex: value, $options: "i" },
                  },
                  {
                    tokenAmount: { $regex: value, $options: "i" },
                  },
                ],
              },
            ]
          : [],
      })
    );
  }, 1200);

  const debouncedSearchChange = useCallback(
    (value: string) => request(value),
    [request]
  );

  return (
    <Box sx={ActivitiesListStyles}>
      <SearchBox
        placeholder="Activities"
        value={search}
        onChange={(e: string) => {
          debouncedSearchChange(e);
          setSearch(e);
        }}
        filters={options}
        hideCount
      />

      {items && items.length > 0 ? (
        <ActivitiesListItems />
      ) : (
        <ActivitiesListEmpty />
      )}

      {debug.enabled && debug.features?.LEADERBOARD && <LeaderboardBanner />}
    </Box>
  );
};

const ActivitiesListStyles = {
  width: "100%",
  padding: "0",
  boxSizing: "border-box",
};

export default ActivitiesList;
