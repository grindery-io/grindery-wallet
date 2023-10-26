import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
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
import SearchBox, { Filter } from "../SearchBox/SearchBox";
import { getActivityRequest } from "../../../services/activity";
import { STORAGE_KEYS } from "../../../constants";

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

  const getTgActivity = useCallback(async () => {
    if (!window.Telegram?.WebApp?.initData) {
      return;
    }

    dispatch(
      appStoreActions.setActivity({
        loading: true,
      })
    );

    try {
      const find = [...(activity.find || [])];
      const filters: any = {
        $or: [],
      };
      if (activity.filters.includes("received")) {
        filters["$or"].push({
          recipientTgId: user?.userTelegramID,
        });
      }
      if (activity.filters.includes("sent")) {
        filters["$or"].push({
          senderTgId: user?.userTelegramID,
        });
      }
      if (filters["$or"].length > 0) {
        find.push(filters);
      }

      const res = await getActivityRequest(find, activity.skip);

      dispatch(
        appStoreActions.setActivity({
          total: res.data?.total || 0,
        })
      );
      if (activity.skip === 0) {
        dispatch(appStoreActions.setActivityItems(res.data?.docs || []));
        localStorage.setItem(
          STORAGE_KEYS.ACTIVITY,
          JSON.stringify(res.data?.docs || [])
        );
      } else {
        dispatch(appStoreActions.addActivityItems(res.data?.docs || []));
      }
    } catch (error) {
      console.error("getTgActivity error", error);
    }
    dispatch(
      appStoreActions.setActivity({
        loading: false,
      })
    );
  }, [activity.filters, user, activity.find, activity.skip, dispatch]);

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
            skip: 0,
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
            skip: 0,
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
        skip: 0,
      })
    );
  }, 1200);

  const debouncedSearchChange = useCallback(
    (value: string) => request(value),
    [request]
  );

  useEffect(() => {
    getTgActivity();
  }, [getTgActivity, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(
        appStoreActions.setActivity({
          skip: 0,
        })
      );
    };
  }, [dispatch]);

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
