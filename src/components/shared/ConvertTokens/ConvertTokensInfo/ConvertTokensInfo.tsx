import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "store";
import User, { UserType } from "components/shared/User/User";
import UserName from "components/shared/User/UserName/UserName";
import UserAvatar from "components/shared/User/UserAvatar/UserAvatar";

const ConvertTokensInfo = () => {
  const { user } = useAppSelector(selectAppStore);

  const currentUser: UserType = {
    userTelegramID: user?.userTelegramID || "",
    userName: user?.userName || "",
    userHandle: user?.userHandle || "",
    patchwallet: user?.patchwallet || "",
    dateAdded: user?.dateAdded || "",
  };

  const handleInfoClick = () => {
    const url = "https://docs.grindery.io/most-valuable-user";
    if (window.Telegram?.WebApp?.openLink) {
      window.Telegram.WebApp.openLink(url);
    } else {
      window.open(url);
    }
  };

  if (!currentUser.patchwallet) return null;

  return (
    <User user={currentUser}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        flexWrap="nowrap"
        useFlexGap
        spacing="8px"
        sx={{
          margin: "16px 24px 0",
          width: "calc(100% - 48px)",
        }}
      >
        <UserAvatar size={32} />
        <Typography textAlign="left">
          <strong>
            <UserName />
          </strong>
        </Typography>
        <Typography textAlign="right" variant="sm" ml="auto">
          MVU: <strong>7.8</strong>
        </Typography>
        <IconButton
          sx={{
            color: "var(--tg-theme-hint-color, #999999)",
            marginLeft: "-8px",
          }}
          size="small"
          edge="end"
          onClick={handleInfoClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.5 6C0.5 9.03757 2.96243 11.5 6 11.5C9.03757 11.5 11.5 9.03757 11.5 6C11.5 2.96243 9.03757 0.5 6 0.5C2.96243 0.5 0.5 2.96243 0.5 6ZM10.5 6C10.5 8.48528 8.48528 10.5 6 10.5C3.51472 10.5 1.5 8.48528 1.5 6C1.5 3.51472 3.51472 1.5 6 1.5C8.48528 1.5 10.5 3.51472 10.5 6ZM6.00016 8.49917C6.2764 8.49917 6.50033 8.27532 6.50033 7.99917C6.50033 7.72303 6.2764 7.49917 6.00016 7.49917C5.72393 7.49917 5.5 7.72303 5.5 7.99917C5.5 8.27532 5.72393 8.49917 6.00016 8.49917ZM5.5 7H6.5C6.5 6.60082 6.56271 6.52766 6.97361 6.32221C7.68771 5.96516 8 5.60082 8 4.75C8 3.66031 7.14217 3 6 3C4.89543 3 4 3.89543 4 5H5C5 4.44772 5.44772 4 6 4C6.63858 4 7 4.2782 7 4.75C7 5.14918 6.93729 5.22234 6.52639 5.42779C5.81229 5.78484 5.5 6.14918 5.5 7Z"
              fill="currentColor"
            />
          </svg>
        </IconButton>
      </Stack>
    </User>
  );
};

export default ConvertTokensInfo;
