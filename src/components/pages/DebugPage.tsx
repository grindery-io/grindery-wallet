import React, { useState } from "react";
import useBackButton from "../../hooks/useBackButton";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Stack,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import appPackage from "../../../package.json";
import { EXPERIMENTAL_FEATURES, STORAGE_KEYS } from "../../constants";
import getLocalStorageSize from "../../utils/getLocalStorageSize";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import UserAddress from "../shared/UserAddress";

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
  const dispatch = useAppDispatch();
  const { user, debug } = useAppSelector(selectAppStore);

  const [cache, setCache] = useState<string>(getLocalStorageSize());
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
              checked={debug.enabled}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(
                  appStoreActions.setDebug({
                    enabled: event.target.checked,
                  })
                );

                localStorage.setItem(
                  STORAGE_KEYS.DEBUG,
                  event.target.checked ? "true" : "false"
                );
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        {!debug.enabled && (
          <Box sx={{ margin: "32px 20px", textAlign: "center" }}>
            <Typography variant="title">🛠️</Typography>
            <Typography color="hint" variant="sm" sx={{ marginTop: "8px" }}>
              Enable debug mode to access experimental features and app
              information
            </Typography>
          </Box>
        )}
        {debug.enabled && (
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
            {process.env.REACT_APP_TELEGRAM_API_ID && (
              <>
                <ListItem>
                  <ListItemText
                    primary="Telegram Client API ID"
                    sx={{ color: "var(--tg-theme-text-color, #000000)" }}
                  />
                  <ListItemSecondaryAction>
                    <ListItemText
                      secondary={process.env.REACT_APP_TELEGRAM_API_ID}
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

            <>
              <ListItem>
                <ListItemText
                  primary="Cache size"
                  sx={{ color: "var(--tg-theme-text-color, #000000)" }}
                />
                <ListItemSecondaryAction>
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
                          const confirmed =
                            window.confirm("Clear local cache?");
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
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </>

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
                    <UserAddress border={false} avatar={false} />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </>
            )}

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

              {Object.keys(EXPERIMENTAL_FEATURES).map((key) => (
                <React.Fragment key={key}>
                  <ListItem>
                    <ListItemText
                      primary={
                        EXPERIMENTAL_FEATURES[
                          key as keyof typeof EXPERIMENTAL_FEATURES
                        ]
                      }
                      sx={{ color: "var(--tg-theme-text-color, #000000)" }}
                    />
                    <ListItemSecondaryAction>
                      <StyledSwitch
                        checked={debug.features?.[key]}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
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
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </>
          </>
        )}
      </List>
    </Box>
  );
};

export default DebugPage;
