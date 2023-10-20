import React from "react";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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
    <ButtonBase
      onClick={() => {
        setTimeout(() => {
          onClear();
        }, 200);
      }}
      sx={SendTokensInputRecipientStyles}
    >
      <Stack
        alignItems="center"
        useFlexGap
        direction="row"
        spacing="16px"
        sx={{ width: "100%" }}
      >
        {isSingle && <UserAvatar size={36} user={user} />}

        <Box textAlign="left">
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

        <Box
          sx={{
            padding: "0 4px",
            marginLeft: "auto",
          }}
        >
          <ArrowDropDownIcon
            sx={{
              display: "block",
              color: "var(--tg-theme-hint-color, #999999)",
            }}
          />
        </Box>
      </Stack>
    </ButtonBase>
  );
};

const SendTokensInputRecipientStyles = {
  width: "100%",
  borderRadius: "10px",
  border: "none",
  background: "var(--tg-theme-secondary-bg-color, #efeff3)",
  padding: "10px 10px 10px 20px",
};

export default SendTokensInputRecipient;
