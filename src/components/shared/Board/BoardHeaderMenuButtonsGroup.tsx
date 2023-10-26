import React from "react";
import { Button, ButtonGroup, Stack } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";

const BoardHeaderMenuButtonsGroup = ({
  setHideLoader,
  handleClose,
}: {
  setHideLoader: (a: boolean) => void;
  handleClose: () => void;
}) => {
  const {
    leaderboard: { loading, sort, order },
  } = useAppSelector(selectAppStore);
  const dispatch = useAppDispatch();

  return (
    <ButtonGroup
      size="small"
      fullWidth
      sx={{
        "& .MuiButton-root": {
          fontWeight: 400,
        },
      }}
    >
      <Button
        onClick={() => {
          if (sort !== "txCount") {
            dispatch(
              appStoreActions.setLeaderboard({
                sort: "txCount",
                page: 1,
                docs: [],
              })
            );
            setHideLoader(true);
            handleClose();
          }
        }}
        disabled={loading}
        key="txCount"
        variant={sort === "txCount" ? "contained" : "outlined"}
        sx={{
          padding: "2px 8px",
        }}
      >
        Transfer
      </Button>
      <Button
        variant={sort === "rewardsCount" ? "contained" : "outlined"}
        sx={{
          padding: "2px 8px",
        }}
        onClick={() => {
          if (sort !== "rewardsCount") {
            dispatch(
              appStoreActions.setLeaderboard({
                sort: "rewardsCount",
                page: 1,
                docs: [],
              })
            );
            setHideLoader(true);
            handleClose();
          }
        }}
        key="rewardsCount"
        disabled={loading}
      >
        Affiliate
      </Button>
      <Button
        variant={sort === "referralsCount" ? "contained" : "outlined"}
        sx={{
          padding: "2px 8px",
        }}
        onClick={() => {
          if (sort !== "referralsCount") {
            dispatch(
              appStoreActions.setLeaderboard({
                sort: "referralsCount",
                page: 1,
                docs: [],
              })
            );
            setHideLoader(true);
            handleClose();
          }
        }}
        key="referralsCount"
        disabled={loading}
      >
        Referral
      </Button>
      <Button
        variant={"outlined"}
        sx={{
          padding: "0px",
          minWidth: "none",
          width: "auto",
        }}
        onClick={() => {
          dispatch(
            appStoreActions.setLeaderboard({
              order: order === "asc" ? "desc" : "asc",
              page: 1,
              docs: [],
            })
          );

          setHideLoader(true);
          handleClose();
        }}
        key="order"
        disabled={loading}
      >
        <Stack>
          <ArrowDropUpIcon
            sx={{
              marginBottom: "-8px",
              color:
                order === "asc"
                  ? "var(--tg-theme-button-color, #2481cc)"
                  : "var(--tg-theme-hint-color, #999999)",
            }}
          />
          <ArrowDropDownIcon
            sx={{
              marginTop: "-8px",
              color:
                order === "desc"
                  ? "var(--tg-theme-button-color, #2481cc)"
                  : "var(--tg-theme-hint-color, #999999)",
            }}
          />
        </Stack>
      </Button>
    </ButtonGroup>
  );
};

export default BoardHeaderMenuButtonsGroup;
