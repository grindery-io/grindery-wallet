import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useAppUser from "../../../../hooks/useAppUser";
import UserAvatar from "../../UserAvatar";
import { selectAppStore, useAppSelector } from "../../../../store";

const SendTokensInputRecipient = ({
  recipient,
  onClear,
}: {
  recipient: string | string[] | null;
  onClear: () => void;
}) => {
  const { contacts } = useAppSelector(selectAppStore);

  const contact = Array.isArray(recipient)
    ? contacts.items?.filter((c: any) => recipient.includes(c.id))
    : contacts.items?.find((c: any) => c.id === recipient);
  const isSingle = !Array.isArray(recipient) || recipient.length === 1;

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
            <>{Array.isArray(recipient) ? recipient.length : 0} contacts</>
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

export default SendTokensInputRecipient;
