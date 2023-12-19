import React from "react";
import { Stack, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "store";
import User, { UserType } from "components/shared/User/User";
import UserName from "components/shared/User/UserName/UserName";
import UserAvatar from "components/shared/User/UserAvatar/UserAvatar";

const ConvertTokensInfo = () => {
  const { user } = useAppSelector(selectAppStore);

  const currentUser: UserType = {
    userTelegramID: user?.userTelegramID || "",
    userName: user?.userName || "",
    userHandle: user?.userHandle || "",
    patchwallet: user?.patchwallet || "",
    dateAdded: user?.dateAdded || "",
  };

  if (!currentUser.patchwallet) return null;

  return (
    <User user={currentUser}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        flexWrap="nowrap"
        useFlexGap
        spacing="8px"
        sx={{
          margin: "16px 24px 0",
          width: "calc(100% - 48px)",
        }}
      >
        <UserAvatar size={32} />
        <Typography textAlign="left">
          <strong>
            <UserName />
          </strong>
        </Typography>
        <Typography textAlign="right" variant="sm" ml="auto">
          MVU: <strong>7.8</strong>
        </Typography>
      </Stack>
    </User>
  );
};

export default ConvertTokensInfo;
