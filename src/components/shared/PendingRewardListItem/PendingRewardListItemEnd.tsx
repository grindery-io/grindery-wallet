import React from "react";
import moment from "moment";
import { TelegramUserActivity } from "../../../types/Telegram";
import useAppUser from "../../../hooks/useAppUser";
import { Button, Stack, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";

export type PendingRewardListItemProps = {
  activity: TelegramUserActivity;
  onClick?: () => void;
  onAvatarClick?: () => void;
  onTextClick?: () => void;
};

const PendingRewardListItemEnd = (props: PendingRewardListItemProps) => {
  const { activity } = props;
  const { user } = useAppSelector(selectAppStore);

  const secondaryUserId =
    user?.userTelegramID === activity.senderTgId
      ? activity.recipientTgId
      : activity.senderTgId;

  const { user: secondaryUser } = useAppUser(secondaryUserId || "");

  const onFollowupClick = () => {
    if (typeof window.Telegram?.WebApp?.openTelegramLink !== "undefined") {
      window.Telegram?.WebApp?.openTelegramLink(
        "https://t.me/" + secondaryUser.username
      );
    } else {
      window.open("https://t.me/" + secondaryUser.username, "_blank");
    }
  };

  return (
    <Stack
      ml="auto"
      direction="column"
      alignItems="flex-end"
      justifyContent="flex-end"
      spacing="4px"
    >
      {secondaryUser.username && (
        <Button
          variant="contained"
          size="small"
          onClick={onFollowupClick}
          sx={PendingRewardListItemEndFollowupButtonStyles}
        >
          Follow up
        </Button>
      )}
      <Typography variant="xs" color="hint">
        Invited {moment(activity.dateAdded).fromNow()}
      </Typography>
    </Stack>
  );
};

const PendingRewardListItemEndFollowupButtonStyles = {
  padding: "2px 8px",
  fontSize: "12px",
  fontWeight: "400",
  borderRadius: "4px",
};

export default PendingRewardListItemEnd;
