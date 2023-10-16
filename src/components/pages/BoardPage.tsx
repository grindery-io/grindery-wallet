import React, { useCallback, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { BOT_API_URL, STORAGE_KEYS } from "../../constants";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  IconButton,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import useBackButton from "../../hooks/useBackButton";
import Leader from "../shared/Leader";
import LeaderFixed from "../shared/LeaderFixed";
import SortIcon from "@mui/icons-material/Sort";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import moment from "moment";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import RefreshIcon from "../icons/RefreshIcon";

const BoardPage = () => {
  useBackButton();
  const {
    user,
    leaderboard: { page, total, loading, sort, order, docs, savedDate },
  } = useAppSelector(selectAppStore);
  const dispatch = useAppDispatch();

  const leaderboard = docs;

  const id = user?.userTelegramID || "";
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [hideLoader, setHideLoader] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getLeaderboard = useCallback(async () => {
    dispatch(appStoreActions.setLeaderboard({ loading: true }));
    try {
      const res = await axios.get(
        `${BOT_API_URL}/v1/leaderboard?limit=15&page=${page}&sortBy=${sort}&order=${order}`
      );
      const items = res.data?.items || [];
      if (page === 1) {
        dispatch(appStoreActions.setLeaderboardDocs(items));
      } else {
        dispatch(appStoreActions.addLeaderboardDocs(items));
      }
      dispatch(
        appStoreActions.setLeaderboard({
          total: res.data?.total || 0,
          savedDate: new Date().toString(),
        })
      );

      if (page === 1 && sort === "txCount" && order === "desc") {
        localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(items));
        localStorage.setItem(
          STORAGE_KEYS.LEADERBOARD_SAVED,
          new Date().toString()
        );
      }
    } catch (error) {
      console.error(error);
    }
    dispatch(appStoreActions.setLeaderboard({ loading: false }));
  }, [page, sort, order, dispatch]);

  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        padding: "0",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap="16px"
        sx={{
          padding: "10px 16px",
          backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
          position: "sticky",
          top: 0,
          borderBottom: "1px solid var(--gr-theme-divider-color)",
          minHeight: "56px",
        }}
      >
        <Box>
          <Typography variant="md">Leaderboard</Typography>
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
        </Box>
        <IconButton
          disabled={loading || leaderboard.length < 1}
          sx={{
            padding: "0px",
            color: "var(--tg-theme-button-color, #2481cc)",
            "&:disabled": {
              color: "var(--tg-theme-button-color, #2481cc)",
              opacity: 0.3,
            },
          }}
          onClick={handleClick}
        >
          <SortIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            sx: { background: "var(--tg-theme-secondary-bg-color, #efeff3)" },
          }}
        >
          <Box sx={{ padding: "10px 12px" }}>
            <Typography color="hint" variant="sm" textAlign="center" mb="8px">
              Sort and order by
            </Typography>
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
          </Box>
        </Menu>
      </Stack>

      <Box
        sx={{
          marginTop: "5px",
          "& .infinite-scroll-component": {
            overflow: "visible !important",
          },
        }}
      >
        <InfiniteScroll
          dataLength={leaderboard.length}
          next={async () => {
            dispatch(appStoreActions.setLeaderboard({ page: page + 1 }));
          }}
          hasMore={leaderboard.length < total}
          loader={
            <Box
              sx={{
                textAlign: "center",
                margin: "20px",
              }}
            >
              <CircularProgress
                size="20px"
                sx={{ color: "var(--tg-theme-button-color, #2481cc)" }}
              />
            </Box>
          }
        >
          {leaderboard.map((leader, index) => (
            <Leader
              leader={leader}
              id={id}
              key={leader.user?.userTelegramID || index}
            />
          ))}
        </InfiniteScroll>
        {!leaderboard
          .map((leader) => leader.user.userTelegramID)
          .includes(id) &&
          leaderboard.length > 0 && <LeaderFixed />}
      </Box>
      {leaderboard.length < 1 && loading && !hideLoader && (
        <Box
          sx={{
            textAlign: "center",
            margin: "50px 20px",
          }}
        >
          <CircularProgress
            sx={{ color: "var(--tg-theme-button-color, #2481cc)" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default BoardPage;
