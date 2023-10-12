import React from "react";
import { Box, FormHelperText, InputBase, Stack } from "@mui/material";
import { TelegramUserContact } from "../../types/Telegram";
import useAppContext from "../../hooks/useAppContext";

const SendMessage = ({
  message,
  onChange,
  recepient,
}: {
  message: string;
  onChange: (value: string) => void;
  recepient?: TelegramUserContact | TelegramUserContact[];
}) => {
  const {
    state: { devMode },
  } = useAppContext();
  return !Array.isArray(recepient) &&
    devMode.enabled &&
    devMode.features?.SEND_MESSAGE ? (
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
      <Box>
        <p
          style={{
            fontSize: "14px",
            margin: 0,
            lineHeight: 1.5,
            color: "var(--tg-theme-text-color, #000000)",
          }}
        >
          Message (beta)
        </p>
        <InputBase
          name="message"
          value={message}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          sx={{}}
          placeholder="Enter message"
          type="text"
          inputProps={{
            sx: {
              color: "var(--tg-theme-text-color, #000000)",
            },
          }}
          multiline
        />
        <FormHelperText sx={{ color: "var(--tg-theme-hint-color, #999999)" }}>
          Will be send to the recipient on your behalf
        </FormHelperText>
      </Box>
    </Stack>
  ) : null;
};

export default SendMessage;
