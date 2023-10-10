import React from "react";
import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

type Props = {
  data: {
    fields: {
      Link?: string;
      Image?: string;
      Status?: string;
      Type?: string;
      Title?: string;
      Description?: string;
    };
  };
};

const Community = ({ data }: Props) => {
  const {
    fields: { Link, Title, Image, Description },
  } = data;
  return (
    <ListItem
      sx={{
        margin: "0 16px 0px",
        width: "calc(100% - 32px)",
        padding: 0,
        backgroundColor: "transparent",
        borderBottom: "1px solid var(--gr-theme-divider-color)",
      }}
    >
      <ListItemButton
        sx={{ padding: "9px 4px 9px 4px" }}
        onClick={
          Link
            ? () => {
                setTimeout(() => {
                  if (
                    typeof window.Telegram?.WebApp?.openTelegramLink !==
                    "undefined"
                  ) {
                    window.Telegram?.WebApp?.openTelegramLink(Link);
                  } else {
                    window.open(Link, "_blank");
                  }
                }, 300);
              }
            : undefined
        }
      >
        <ListItemAvatar sx={{ minWidth: "50px", marginRight: "10px" }}>
          {Image ? (
            <Box
              sx={{
                width: "50px",
                minWidth: "50px",
                height: "50px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                src={Image}
                alt=""
                style={{ width: "50px", height: "50px", display: "block" }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                width: "50px",
                minWidth: "50px",
                height: "50px",
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--tg-theme-secondary-bg-color, #efeff3)",
                color: "var(--tg-theme-text-color, #000000)",
                fontSize: "22px",
              }}
            >
              {Title?.charAt(0)}
            </Box>
          )}
        </ListItemAvatar>
        <ListItemText
          sx={{
            margin: 0,
          }}
          primary={Title}
          secondary={Description}
          primaryTypographyProps={{
            variant: "xs",
            sx: {
              lineHeight: 1.25,
              display: "-webkit-box",
              maxWidth: "100%",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            },
          }}
          secondaryTypographyProps={{
            variant: "xs",
            color: "hint",
            sx: {
              lineHeight: 1.25,
              display: "-webkit-box",
              maxWidth: "100%",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default Community;
