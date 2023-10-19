import React, { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import moment from "moment";
import axios from "axios";
import { BOT_API_URL } from "../../constants";

const LeaderRow = ({
  leader,
  id,
  index,
}: {
  leader: any;
  id: any;
  index: number;
}) => {
  const [balance, setBalance] = useState("...");

  useEffect(() => {
    const controller = new AbortController();
    axios
      .post(
        `${BOT_API_URL}/v2/balance/`,
        {
          userAddress: leader.user?.patchwallet,
          contractAddress: "0xe36BD65609c08Cd17b53520293523CF4560533d0",
          chainId: "matic",
        },
        {
          signal: controller.signal,
        }
      )

      .then((res) => {
        if (res?.data?.balanceEther) {
          setBalance(
            parseFloat(
              (parseFloat(res?.data?.balanceEther) || 0).toFixed(2)
            ).toLocaleString()
          );
        }
      })
      .catch((err) => {
        //
      });

    return () => {
      controller.abort();
    };
  }, [leader.user?.patchwallet]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      sx={{
        background:
          id && id === leader.user?.userTelegramID
            ? "var(--tg-theme-secondary-bg-color, #efeff3)"
            : "var(--tg-theme-bg-color, #ffffff)",
        position:
          id && id === leader.user?.userTelegramID ? "sticky" : undefined,
        top: id && id === leader.user?.userTelegramID ? "41px" : 0,
        bottom: 0,
        zIndex: id && id === leader.user?.userTelegramID ? 2 : 1,
        borderBottom: "1px solid var(--gr-theme-divider-color)",
        "& p": {
          padding:
            id && id === leader.user?.userTelegramID ? "12px 8px" : "8px 8px",
          width: "calc((100% - 210px) / 9)",
          fontWeight:
            id && id === leader.user?.userTelegramID ? "bold" : undefined,
        },
        "& > p:nth-child(1)": {
          width: "60px",
          maxWidth: "60px",
        },
        "& > p:nth-child(2)": {
          width: "150px",
          maxWidth: "150px",
        },
      }}
    >
      <Typography variant="sm" align="center">
        {index + 1}
      </Typography>
      <Typography variant="sm">
        {(
          leader.user?.userName ||
          leader.user?.userHandle ||
          leader.user?.userTelegramId ||
          ""
        ).replace("undefined", "")}
      </Typography>
      <Typography align="right" variant="sm">
        {(leader.txCount || 0).toLocaleString()}
      </Typography>
      <Typography align="right" variant="sm">
        {(leader.rewardsCount || 0).toLocaleString()}
      </Typography>
      <Typography align="right" variant="sm">
        {(leader.referralsCount || 0).toLocaleString()}
      </Typography>
      <Typography align="right" variant="sm">
        {balance}
      </Typography>
      <Typography
        align="right"
        variant="sm"
        title={
          leader.user?.dateAdded
            ? `${new Date(
                leader.user?.dateAdded
              ).toLocaleDateString()} ${new Date(
                leader.user?.dateAdded
              ).toLocaleTimeString()}`
            : undefined
        }
      >
        {leader.user?.dateAdded ? moment(leader.user?.dateAdded).fromNow() : ""}
      </Typography>
      <Typography
        align="right"
        variant="sm"
        title={
          leader.user?.telegramSessionSavedDate
            ? `${new Date(
                leader.user?.telegramSessionSavedDate
              ).toLocaleDateString()} ${new Date(
                leader.user?.telegramSessionSavedDate
              ).toLocaleTimeString()}`
            : undefined
        }
      >
        {leader.user?.telegramSessionSavedDate
          ? moment(leader.user?.telegramSessionSavedDate).fromNow() || ""
          : leader.user?.telegramSession
          ? "Yes"
          : "No"}
      </Typography>
      <Typography
        align="right"
        variant="sm"
        title={
          leader.user?.webAppOpenedFirstDate
            ? `${new Date(
                leader.user?.webAppOpenedFirstDate
              ).toLocaleDateString()} ${new Date(
                leader.user?.webAppOpenedFirstDate
              ).toLocaleTimeString()}`
            : undefined
        }
      >
        {leader.user?.webAppOpenedFirstDate
          ? moment(leader.user?.webAppOpenedFirstDate).fromNow() || "No"
          : "No"}
      </Typography>
      <Typography
        align="right"
        variant="sm"
        title={
          leader.firstTx?.dateAdded
            ? `${new Date(
                leader.firstTx?.dateAdded
              ).toLocaleDateString()} ${new Date(
                leader.firstTx?.dateAdded
              ).toLocaleTimeString()}`
            : undefined
        }
      >
        {leader.firstTx?.dateAdded
          ? moment(leader.firstTx?.dateAdded).fromNow()
          : "No"}
      </Typography>
      <Typography
        align="right"
        variant="sm"
        title={
          leader.lastTx?.dateAdded
            ? `${new Date(
                leader.lastTx?.dateAdded
              ).toLocaleDateString()} ${new Date(
                leader.lastTx?.dateAdded
              ).toLocaleTimeString()}`
            : undefined
        }
      >
        {leader.lastTx?.dateAdded
          ? moment(leader.lastTx?.dateAdded).fromNow()
          : "No"}
      </Typography>
    </Stack>
  );
};

export default LeaderRow;
