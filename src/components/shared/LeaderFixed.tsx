import React from "react";
import { Stack, Typography } from "@mui/material";
import moment from "moment";
import { TOKENS } from "../../constants";
import { selectAppStore, useAppSelector } from "../../store";
import UserAvatar from "./UserAvatar";
import useAppUser from "../../hooks/useAppUser";

const LeaderFixed = () => {
  const {
    user,
    balance: { value: balance },
    stats,
  } = useAppSelector(selectAppStore);

  const { user: appUser } = useAppUser(user?.userTelegramID || "");

  return (
    <Stack
      direction="column"
      alignItems="stretch"
      justifyContent="flex-start"
      sx={{
        background: "var(--tg-theme-secondary-bg-color, #efeff3)",
        position: "sticky",
        bottom: 0,
        left: 0,
        zIndex: 2,
        border: "none",
        borderRadius: 0,
        margin: "0",
        padding: "10px 27px",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing="4px"
        useFlexGap
      >
        <UserAvatar user={appUser} size={20} />
        <Typography variant="sm" sx={{ marginRight: "auto" }}>
          {(
            user?.userName ||
            user?.userHandle ||
            user?.userTelegramID ||
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
          <strong>{(stats?.sentTransactions || 0).toLocaleString()}</strong>
        </Typography>
        <Typography variant="xs" color="hint">
          Affiliate
          <br />
          <strong>{(stats?.rewards || 0).toLocaleString()}</strong>
        </Typography>
        <Typography variant="xs" color="hint">
          Referral
          <br />
          <strong>{(stats?.referrals || 0).toLocaleString()}</strong>
        </Typography>
        {user?.dateAdded && (
          <Typography
            ml="auto"
            variant="xs"
            color="hint"
            textAlign="right"
            title={
              user?.dateAdded
                ? `${new Date(user?.dateAdded).toLocaleDateString()} ${new Date(
                    user?.dateAdded
                  ).toLocaleTimeString()}`
                : undefined
            }
          >
            Joined
            <br />
            <strong>{moment(user?.dateAdded).fromNow()}</strong>
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default LeaderFixed;
