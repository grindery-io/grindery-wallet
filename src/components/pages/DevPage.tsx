import React from "react";
import useBackButton from "../../hooks/useBackButton";
import useAppContext from "../../hooks/useAppContext";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  styled,
} from "@mui/material";
import appPackage from "../../../package.json";

const StyledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "var(--tg-theme-button-color, #2481cc)",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "var(--tg-theme-hint-color, #999999)",
  },
  "& .MuiSwitch-track": {
    position: "relative",
    top: "1px",
  },
}));

const DevPage = () => {
  useBackButton();
  const {
    setState,
    state: { devMode, user },
  } = useAppContext();
  return (
    <Box sx={{ width: "100%" }}>
      <p
        style={{
          fontSize: "14px",
          textAlign: "center",
          color: "var(--tg-theme-hint-color, #999999)",
          margin: "20px",
          padding: 0,
        }}
      >
        Caution: Developer Mode Access.
        <br />
        Use with expertise. Only proceed if you are fully versed in its
        functions.
      </p>
      <List>
        <ListItem>
          <ListItemText
            sx={{ color: "var(--tg-theme-text-color, #000000)" }}
            primary="Developer Mode"
          />
          <ListItemSecondaryAction>
            <StyledSwitch
              checked={Boolean(devMode)}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setState({
                  devMode: event.target.checked,
                });
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        {devMode && (
          <>
            <Divider />
            <ListItem>
              <ListItemText
                primary="App package"
                sx={{ color: "var(--tg-theme-text-color, #000000)" }}
              />
              <ListItemSecondaryAction>
                <ListItemText
                  secondary={appPackage.name}
                  sx={{
                    color: "var(--tg-theme-hint-color, #999999)",
                    "& .MuiListItemText-secondary": {
                      color: "var(--tg-theme-hint-color, #999999)",
                    },
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="App version"
                sx={{ color: "var(--tg-theme-text-color, #000000)" }}
              />
              <ListItemSecondaryAction>
                <ListItemText
                  secondary={appPackage.version}
                  sx={{
                    color: "var(--tg-theme-hint-color, #999999)",
                    "& .MuiListItemText-secondary": {
                      color: "var(--tg-theme-hint-color, #999999)",
                    },
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            {window.Telegram?.WebApp?.version && (
              <>
                <ListItem>
                  <ListItemText
                    primary="Bot API version"
                    sx={{ color: "var(--tg-theme-text-color, #000000)" }}
                  />
                  <ListItemSecondaryAction>
                    <ListItemText
                      secondary={window.Telegram?.WebApp?.version}
                      sx={{
                        color: "var(--tg-theme-hint-color, #999999)",
                        "& .MuiListItemText-secondary": {
                          color: "var(--tg-theme-hint-color, #999999)",
                        },
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </>
            )}
            {window.Telegram?.WebApp?.platform && (
              <>
                <ListItem>
                  <ListItemText
                    primary="Platform"
                    sx={{ color: "var(--tg-theme-text-color, #000000)" }}
                  />
                  <ListItemSecondaryAction>
                    <ListItemText
                      secondary={window.Telegram?.WebApp?.platform}
                      sx={{
                        color: "var(--tg-theme-hint-color, #999999)",
                        "& .MuiListItemText-secondary": {
                          color: "var(--tg-theme-hint-color, #999999)",
                        },
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </>
            )}
            {window.Telegram?.WebApp?.colorScheme && (
              <>
                <ListItem>
                  <ListItemText
                    primary="Color scheme"
                    sx={{ color: "var(--tg-theme-text-color, #000000)" }}
                  />
                  <ListItemSecondaryAction>
                    <ListItemText
                      secondary={window.Telegram?.WebApp?.colorScheme}
                      sx={{
                        color: "var(--tg-theme-hint-color, #999999)",
                        "& .MuiListItemText-secondary": {
                          color: "var(--tg-theme-hint-color, #999999)",
                        },
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </>
            )}
            <ListItem>
              <ListItemText
                primary="Telegram account connected"
                sx={{ color: "var(--tg-theme-text-color, #000000)" }}
              />
              <ListItemSecondaryAction>
                <ListItemText
                  secondary={user?.telegramSession ? "Yes" : "No"}
                  sx={{
                    color: "var(--tg-theme-hint-color, #999999)",
                    "& .MuiListItemText-secondary": {
                      color: "var(--tg-theme-hint-color, #999999)",
                    },
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </>
        )}
      </List>
    </Box>
  );
};

export default DevPage;
