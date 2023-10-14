import React, { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import moment from "moment";
import axios from "axios";
import { BOT_API_URL, TOKENS } from "../../constants";

const Leader = ({
  leader,
  id,
  index,
}: {
  leader: any;
  id: any;
  index: number;
}) => {
  const [balance, setBalance] = useState("");

  const isMe = id && id === leader.user?.userTelegramID;

  useEffect(() => {
    const controller = new AbortController();
    axios
      .post(
        `${BOT_API_URL}/v1/balance/`,
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
      direction="column"
      alignItems="stretch"
      justifyContent="flex-start"
      sx={{
        background: isMe
          ? "var(--tg-theme-secondary-bg-color, #efeff3)"
          : "var(--tg-theme-bg-color, #ffffff)",
        position: isMe ? "sticky" : undefined,
        top: isMe ? "50px" : 0,
        bottom: 0,
        zIndex: isMe ? 2 : 1,
        border: isMe ? "none" : "1px solid var(--gr-theme-divider-color)",
        borderRadius: isMe ? 0 : "5px",
        margin: isMe ? "0 0 10px" : "0 16px 10px",
        padding: isMe ? "10px 27px" : "10px",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing="12px"
      >
        <Typography variant="sm">
          {(
            leader.user?.userName ||
            leader.user?.userHandle ||
            leader.user?.userTelegramId ||
            ""
          ).replace("undefined", "")}{" "}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing="4px"
          sx={{
            "& img": {
              width: "16px",
              height: "16px",
              display: "block",
            },
          }}
        >
          <Typography variant="xs">{balance || "..."}</Typography>
          <img src={TOKENS[0].icon} alt="" />
        </Stack>
      </Stack>
      <Stack
        useFlexGap
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing="12px"
        mt="6px"
      >
        <Typography variant="xs" color="hint">
          Transfer
          <br />
          <strong>{(leader.txCount || 0).toLocaleString()}</strong>
        </Typography>
        <Typography variant="xs" color="hint">
          Affiliate
          <br />
          <strong>{(leader.rewardsCount || 0).toLocaleString()}</strong>
        </Typography>
        <Typography variant="xs" color="hint">
          Referral
          <br />
          <strong>{(leader.referralsCount || 0).toLocaleString()}</strong>
        </Typography>
        {leader.user?.dateAdded && (
          <Typography
            ml="auto"
            variant="xs"
            color="hint"
            textAlign="right"
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
            Joined
            <br />
            <strong>{moment(leader.user?.dateAdded).fromNow()}</strong>
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default Leader;
