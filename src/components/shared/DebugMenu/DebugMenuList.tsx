import React, { useState } from "react";
import { Divider, IconButton, List, ListItemText, Stack } from "@mui/material";
import { EXPERIMENTAL_FEATURES, STORAGE_KEYS } from "../../../constants";
import getLocalStorageSize from "../../../utils/getLocalStorageSize";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import UserAddress from "../UserAddress";
import DebugMenuListItemMode from "./DebugMenuListItemMode";
import DebugMenuListDescription from "./DebugMenuListDescription";
import DebugMenuListSubheader from "./DebugMenuListSubheader";
import DebugMenuListItemAppPackage from "./DebugMenuListItemAppPackage";
import DebugMenuListItemAppVersion from "./DebugMenuListItemAppVersion";
import DebugMenuListItem from "./DebugMenuListItem";
import StyledSwitch from "../StyledSwitch";

const DebugMenuList = () => {
  const dispatch = useAppDispatch();
  const { user, debug } = useAppSelector(selectAppStore);

  const [cache, setCache] = useState<string>(getLocalStorageSize());
  return (
    <List sx={DebugMenuListStyles}>
      <DebugMenuListItemMode />
      {!debug.enabled && <DebugMenuListDescription />}
      {debug.enabled && (
        <>
          <Divider />
          <DebugMenuListSubheader label="App info" />
          <DebugMenuListItemAppPackage />
          <Divider />
          <DebugMenuListItemAppVersion />
          <Divider />
          {window.Telegram?.WebApp?.version && (
            <>
              <DebugMenuListItem
                label="Bot API version"
                value={window.Telegram?.WebApp?.version}
              />
              <Divider />
            </>
          )}
          {process.env.REACT_APP_TELEGRAM_API_ID && (
            <>
              <DebugMenuListItem
                label="Telegram Client API ID"
                value={process.env.REACT_APP_TELEGRAM_API_ID}
              />
              <Divider />
            </>
          )}
          <DebugMenuListItem
            label="Platform"
            value={window.Telegram?.WebApp?.platform || "web browser"}
          />
          <Divider />
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
          <Divider />
          <DebugMenuListSubheader label="User info" />
          <DebugMenuListItem
            label="User ID"
            value={user?.userTelegramID || "N/A"}
          />
          <Divider />
          {user?.userHandle && (
            <>
              <DebugMenuListItem
                label="Username"
                value={`@${user?.userHandle}`}
                onValueClick={() => {
                  if (
                    typeof window.Telegram?.WebApp?.openTelegramLink !==
                    "undefined"
                  ) {
                    window.Telegram?.WebApp?.openTelegramLink(
                      "https://t.me/" + user?.userHandle
                    );
                  } else {
                    window.open("https://t.me/" + user?.userHandle, "_blank");
                  }
                }}
              />
              <Divider />
            </>
          )}
          <DebugMenuListItem
            label="Telegram account connected"
            value={user?.telegramSession ? "Yes" : "No"}
          />
          <Divider />
          {user?.patchwallet && (
            <>
              <DebugMenuListItem
                label="Wallet address"
                value={<UserAddress border={false} avatar={false} />}
              />
              <Divider />
            </>
          )}

          <DebugMenuListSubheader label="Experimental features" />

          {Object.keys(EXPERIMENTAL_FEATURES).map((key) => (
            <React.Fragment key={key}>
              <DebugMenuListItem
                label={
                  EXPERIMENTAL_FEATURES[
                    key as keyof typeof EXPERIMENTAL_FEATURES
                  ]
                }
                value={
                  <StyledSwitch
                    checked={debug.features?.[key]}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        appStoreActions.setDebugFeatures({
                          [key]: event.target.checked,
                        })
                      );
                      localStorage.setItem(
                        STORAGE_KEYS.EXPERIMENTAL_FEATURES.replace(
                          "{{key}}",
                          key
                        ),
                        event.target.checked ? "true" : "false"
                      );
                    }}
                  />
                }
              />
              <Divider />
            </React.Fragment>
          ))}
        </>
      )}
    </List>
  );
};

const DebugMenuListStyles = {
  "& .MuiListItemText-primary": {
    fontSize: "14px",
  },
  "& .MuiListItemText-secondary": {
    fontSize: "14px",
  },
};

export default DebugMenuList;
