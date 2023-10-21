import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";
import SearchBox, { Filter } from "../../shared/SearchBox";
import { debounce } from "lodash";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import RewardsListEmpty from "./RewardsListEmpty";
import RewardsListLoading from "./RewardsListLoading";
import RewardsListItems from "./RewardsListItems";

const RewardsList = () => {
  const dispatch = useAppDispatch();
  const {
    rewards: { docs: data, filter, loading },
  } = useAppSelector(selectAppStore);

  const [search, setSearch] = useState("");

  const options: Filter[] = [
    {
      key: "pending",
      label: "Eligible for reward",
      value: filter === "pending",
      type: "radio",
      isActive: filter === "pending",
      onChange: (value) => {
        dispatch(
          appStoreActions.setRewards({
            filter: value.toString() || "",
          })
        );
      },
    },
    {
      key: "received",
      label: "Rewards received",
      value: filter === "received",
      type: "radio",
      isActive: filter === "received",
      onChange: (value) => {
        dispatch(
          appStoreActions.setRewards({
            filter: value.toString() || "",
          })
        );
      },
    },
  ];

  const request = debounce((value) => {
    dispatch(
      appStoreActions.setRewards({
        find: value
          ? [
              {
                $or: [
                  {
                    transactionHash: { $regex: value, $options: "i" },
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
    <>
      <Box sx={RewardsListStyles}>
        <SearchBox
          placeholder="Rewards"
          value={search}
          onChange={(e: string) => {
            debouncedSearchChange(e);
            setSearch(e);
          }}
          filters={options}
          hideCount
        />
        <Box sx={{ textAlign: "left" }}>
          <>
            {data.length > 0 ? (
              <RewardsListItems />
            ) : (
              <>{loading ? <RewardsListLoading /> : <RewardsListEmpty />}</>
            )}
          </>
        </Box>
      </Box>
    </>
  );
};

const RewardsListStyles = {
  width: "100%",
  padding: "0",
  boxSizing: "border-box",
};

export default RewardsList;
