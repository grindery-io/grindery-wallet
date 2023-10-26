import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import moment from "moment";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import RefreshIcon from "../../icons/RefreshIcon";

const BoardHeaderStatus = () => {
  const {
    leaderboard: { loading, savedDate },
  } = useAppSelector(selectAppStore);
  const dispatch = useAppDispatch();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      gap="4px"
      flexWrap="nowrap"
    >
      {savedDate && (
        <Typography variant="xs" color="hint">
          Updated {moment(savedDate).fromNow()}
        </Typography>
      )}
      {savedDate && (
        <>
          <IconButton
            onClick={() => {
              dispatch(
                appStoreActions.setLeaderboard({
                  page: 1,
                })
              );
            }}
            disabled={loading}
            sx={{
              padding: 0,
              margin: 0,
              color: "var(--tg-theme-button-color, #2481cc)",
              "&:disabled": {
                color: "var(--tg-theme-hint-color, #999999)",
              },
              "& svg": {
                WebkitAnimation: "spin 0.75s linear infinite",
                MozAnimation: "spin 0.75s linear infinite",
                animation: "spin 0.75s linear infinite",
                animationPlayState: loading ? "running" : "paused",
                width: "14px",
                height: "14px",
                display: "block",
              },
            }}
          >
            <RefreshIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );
};

export default BoardHeaderStatus;
