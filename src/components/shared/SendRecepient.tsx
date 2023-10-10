import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TelegramUserContact } from "../../types/Telegram";
import useAppUser from "../../hooks/useAppUser";
import UserAvatar from "./UserAvatar";

const SendRecepient = ({
  recepient,
  onClear,
}: {
  recepient: TelegramUserContact | TelegramUserContact[];
  onClear: () => void;
}) => {
  const isSingle = !Array.isArray(recepient) || recepient.length === 1;
  const contact = isSingle
    ? Array.isArray(recepient)
      ? recepient[0]
      : recepient
    : null;
  const { user } = useAppUser(contact?.id || "");
  return (
    <Stack
      alignItems="center"
      useFlexGap
      direction="row"
      sx={{
        borderRadius: "10px",
        border: "none",
        background: "var(--tg-theme-secondary-bg-color, #efeff3)",
        width: "100%",
        padding: "10px 10px 10px 20px",
      }}
      spacing="16px"
    >
      {isSingle && <UserAvatar size={36} user={user} />}

      <Box>
        <Typography variant="sm" sx={{ lineHeight: 1.5 }}>
          Recipient{!isSingle ? "s" : ""}
        </Typography>
        <Typography color="hint" variant="sm" sx={{ lineHeight: 1.5 }}>
          {isSingle && contact ? (
            <>
              {user.name}
              {user.username ? ` | @${user.username}` : ""}
            </>
          ) : (
            <>{Array.isArray(recepient) ? recepient.length : 0} contacts</>
          )}
        </Typography>
      </Box>
      <Box sx={{ marginLeft: "auto" }}>
        <IconButton onClick={onClear}>
          <CloseIcon
            sx={{
              color: "var(--tg-theme-hint-color, #999999)",
            }}
          />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default SendRecepient;
