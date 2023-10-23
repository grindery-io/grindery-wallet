import React, { useState } from "react";
import { IconButton, ListItemText, Stack } from "@mui/material";
import getLocalStorageSize from "../../../utils/getLocalStorageSize";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DebugMenuListItem from "./DebugMenuListItem";

const DebugMenuListItemCache = () => {
  const [cache, setCache] = useState<string>(getLocalStorageSize());
  return (
    <DebugMenuListItem
      label="Cache size"
      value={
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing="4px"
        >
          <ListItemText
            secondary={cache}
            sx={{
              color: "var(--tg-theme-hint-color, #999999)",
              "& .MuiListItemText-secondary": {
                color: "var(--tg-theme-hint-color, #999999)",
              },
            }}
          />
          <IconButton
            size="small"
            onClick={() => {
              if (window.Telegram?.WebApp?.showConfirm) {
                window.Telegram?.WebApp?.showConfirm(
                  "Clear local cache?",
                  (confirmed: boolean) => {
                    if (confirmed) {
                      localStorage.clear();
                      setCache(getLocalStorageSize());
                    }
                  }
                );
              } else {
                const confirmed = window.confirm("Clear local cache?");
                if (confirmed) {
                  localStorage.clear();
                  setCache(getLocalStorageSize());
                }
              }
            }}
          >
            <DeleteForeverIcon
              sx={{ color: "var(--tg-theme-hint-color, #999999)" }}
            />
          </IconButton>
        </Stack>
      }
    />
  );
};

export default DebugMenuListItemCache;
