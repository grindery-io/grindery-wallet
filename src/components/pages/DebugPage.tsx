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
  ListSubheader,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import appPackage from "../../../package.json";
import Address from "../shared/Address";

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

const DebugPage = () => {
  useBackButton();
  const {
    setState,
    state: { devMode, user },
  } = useAppContext();
  return (
    <Box sx={{ width: "100%", padding: "16px 0" }}>
      <Box sx={{ textAlign: "center", margin: "4px 20px 20px" }}>
        <Typography variant="title">⚠️</Typography>
        <Typography variant="sm" sx={{ marginTop: "4px" }} color="hint">
          Caution: Debug Mode. Use with expertise. Only proceed if you know what
          you are doing.
        </Typography>
      </Box>
      <List
        sx={{
          "& .MuiListItemText-primary": {
            fontSize: "14px",
          },
          "& .MuiListItemText-secondary": {
            fontSize: "14px",
          },
        }}
      >
        <ListItem>
          <ListItemText
            sx={{ color: "var(--tg-theme-text-color, #000000)" }}
            primary="Debug Mode"
          />
          <ListItemSecondaryAction>
            <StyledSwitch
              checked={devMode.enabled}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setState({
                  devMode: {
                    ...devMode,
                    enabled: event.target.checked,
                  },
                });
                localStorage.setItem(
                  "grindery_wallet_dev_mode",
                  event.target.checked ? "true" : "false"
                );
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        {!devMode.enabled && (
          <Box sx={{ margin: "32px 20px", textAlign: "center" }}>
            <Typography variant="title">🛠️</Typography>
            <Typography color="hint" variant="sm" sx={{ marginTop: "8px" }}>
              Enable debug mode to access experimental features and app
              information
            </Typography>
          </Box>
        )}
        {devMode.enabled && (
          <>
            <Divider />
            <ListSubheader
              component="div"
              sx={{
                marginTop: "30px",
                backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
                color: "var(--tg-theme-hint-color, #999999)",
                fontFamily: "Geologica",
              }}
            >
              App info
            </ListSubheader>
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

            <>
              <ListItem>
                <ListItemText
                  primary="Platform"
                  sx={{ color: "var(--tg-theme-text-color, #000000)" }}
                />
                <ListItemSecondaryAction>
                  <ListItemText
                    secondary={
                      window.Telegram?.WebApp?.platform || "web browser"
                    }
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
            <ListSubheader
              component="div"
              sx={{
                marginTop: "30px",
                backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
                color: "var(--tg-theme-hint-color, #999999)",
                fontFamily: "Geologica",
              }}
            >
              User info
            </ListSubheader>
            <ListItem>
              <ListItemText
                primary="User ID"
                sx={{ color: "var(--tg-theme-text-color, #000000)" }}
              />
              <ListItemSecondaryAction>
                <ListItemText
                  secondary={user?.userTelegramID || "N/A"}
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
            {user?.userHandle && (
              <>
                <ListItem>
                  <ListItemText
                    primary="Username"
                    sx={{ color: "var(--tg-theme-text-color, #000000)" }}
                  />
                  <ListItemSecondaryAction
                    sx={{ cursor: "pointer" }}
                    tabIndex={0}
                    onClick={() => {
                      if (
                        typeof window.Telegram?.WebApp?.openTelegramLink !==
                        "undefined"
                      ) {
                        window.Telegram?.WebApp?.openTelegramLink(
                          "https://t.me/" + user?.userHandle
                        );
                      } else {
                        window.open(
                          "https://t.me/" + user?.userHandle,
                          "_blank"
                        );
                      }
                    }}
                  >
                    <ListItemText
                      secondary={`@${user?.userHandle}`}
                      sx={{
                        color: "var(--tg-theme-link-color, #2481cc)",
                        "& .MuiListItemText-secondary": {
                          color: "var(--tg-theme-link-color, #2481cc)",
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
            {user?.patchwallet && (
              <>
                <ListItem>
                  <ListItemText
                    primary="Wallet address"
                    sx={{ color: "var(--tg-theme-text-color, #000000)" }}
                  />
                  <ListItemSecondaryAction>
                    <Address border={false} avatar={false} />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </>
            )}

            {user?.telegramSession && (
              <>
                <ListSubheader
                  component="div"
                  sx={{
                    marginTop: "30px",
                    backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
                    color: "var(--tg-theme-hint-color, #999999)",
                    fontFamily: "Geologica",
                  }}
                >
                  Experimental features
                </ListSubheader>

                <ListItem>
                  <ListItemText
                    primary="Message sending"
                    sx={{ color: "var(--tg-theme-text-color, #000000)" }}
                  />
                  <ListItemSecondaryAction>
                    <StyledSwitch
                      checked={devMode.features?.sendMessage}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setState({
                          devMode: {
                            ...devMode,
                            features: {
                              ...devMode.features,
                              sendMessage: event.target.checked,
                            },
                          },
                        });
                        localStorage.setItem(
                          "grindery_wallet_features_send_message",
                          event.target.checked ? "true" : "false"
                        );
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </>
            )}
          </>
        )}
      </List>
    </Box>
  );
};

export default DebugPage;
