import React, { useCallback, useEffect, useReducer } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { BOT_API_URL } from "../../constants";
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
import useAppContext from "../../hooks/useAppContext";
import Leader from "../shared/Leader";
import LeaderFixed from "../shared/LeaderFixed";
import SortIcon from "@mui/icons-material/Sort";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

type StateProps = {
  page: number;
  total: number;
  loading: boolean;
  sort: string;
  order: string;
};

const BoardPage = () => {
  useBackButton();
  const [state, setState] = useReducer(
    (state: StateProps, newState: Partial<StateProps>) => ({
      ...state,
      ...newState,
    }),
    {
      page: 1,
      total: 0,
      loading: true,
      sort: "txCount",
      order: "desc",
    }
  );
  const {
    state: { user },
  } = useAppContext();
  const [leaderboard, setLeaderboard] = React.useState<any[]>([]);
  const { page, loading, sort, order } = state;
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
    setState({ loading: true });
    try {
      const res = await axios.get(
        `${BOT_API_URL}/v1/leaderboard?limit=30&page=${page}&sortBy=${sort}&order=${order}`
      );
      const items = res.data?.items || [];
      setLeaderboard((_leaderboard) =>
        page === 1 ? items : [..._leaderboard, ...items]
      );
      setState({ total: res.data?.total || 0 });
    } catch (error) {
      console.error(error);
    }
    setState({ loading: false });
  }, [page, sort, order]);

  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

  if (window.origin.includes("localhost")) {
    console.log("state", state);
    console.log("leaderboard", leaderboard);
  }

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
        alignItems="flex-end"
        justifyContent="space-between"
        gap="16px"
        sx={{
          padding: "10px 16px",
          backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
          position: "sticky",
          top: 0,
          borderBottom: "1px solid var(--gr-theme-divider-color)",
          minHeight: "50px",
        }}
      >
        <Typography>Leaderboard</Typography>
        <IconButton
          disabled={loading}
          sx={{
            padding: "0px",
            color: "var(--tg-theme-button-color, #2481cc)",
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
            <ButtonGroup size="small" fullWidth>
              <Button
                onClick={() => {
                  if (sort !== "txCount") {
                    setState({ sort: "txCount", page: 1 });
                    setHideLoader(true);
                    setLeaderboard([]);
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
                    setState({ sort: "rewardsCount", page: 1 });
                    setHideLoader(true);
                    setLeaderboard([]);
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
                    setState({ sort: "referralsCount", page: 1 });
                    setHideLoader(true);
                    setLeaderboard([]);
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
                  setState({
                    order: order === "asc" ? "desc" : "asc",
                    page: 1,
                  });
                  setHideLoader(true);
                  setLeaderboard([]);
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
            setState({ page: page + 1 });
          }}
          hasMore={leaderboard.length < state.total}
          loader={
            <Box
              sx={{
                textAlign: "center",
                margin: "20px",
              }}
            >
              <CircularProgress
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
      {leaderboard.length < 1 && state.loading && !hideLoader && (
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
