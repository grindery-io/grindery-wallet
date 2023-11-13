import React from "react";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { selectAppStore, useAppSelector } from "../../../../store";
import Contact, { ContactType } from "../../Contact/Contact";
import ContactAvatar from "../../Contact/ContactAvatar/ContactAvatar";
import ContactName from "../../Contact/ContactName/ContactName";

const SendTokensInputRecipient = ({
  recipient,
  onClear,
}: {
  recipient: string | string[] | null;
  onClear: () => void;
}) => {
  const { contacts } = useAppSelector(selectAppStore);

  const contact = Array.isArray(recipient)
    ? contacts.items?.filter((c: ContactType) => recipient.includes(c.id))[0]
    : contacts.items?.find((c: ContactType) => c.id === recipient);

  const isSingle = !Array.isArray(recipient) || recipient.length === 1;

  return contact ? (
    <Contact contact={contact}>
      <ButtonBase
        onClick={() => {
          onClear();
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
          {isSingle && <ContactAvatar />}

          <Box textAlign="left">
            <Typography variant="sm" sx={{ lineHeight: 1.5 }}>
              Recipient{!isSingle ? "s" : ""}
            </Typography>
            <Typography color="hint" variant="sm" sx={{ lineHeight: 1.5 }}>
              {isSingle ? (
                <>
                  <ContactName />
                  {contact.username && (
                    <>
                      {" | @"}
                      <ContactName format="username" />
                    </>
                  )}
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
    </Contact>
  ) : null;
};

const SendTokensInputRecipientStyles = {
  width: "100%",
  borderRadius: "10px",
  border: "none",
  background: "var(--tg-theme-secondary-bg-color, #efeff3)",
  padding: "10px 10px 10px 20px",
};

export default SendTokensInputRecipient;
