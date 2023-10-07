import React from "react";
import { Box } from "@mui/material";

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
    <div
      style={{
        padding: 0,
        margin: "0px 16px 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "10px",
          padding: "5px 4px 9px 4px",
          borderBottom: "1px solid var(--gr-theme-divider-color)",
          marginBottom: "4px",
          cursor: Link ? "pointer" : "default",
        }}
        className="community"
        onClick={
          Link
            ? () => {
                if (
                  typeof window.Telegram?.WebApp?.openTelegramLink !==
                  "undefined"
                ) {
                  window.Telegram?.WebApp?.openTelegramLink(Link);
                } else {
                  window.open(Link, "_blank");
                }
              }
            : undefined
        }
      >
        {Image && (
          <div
            style={{
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
          </div>
        )}
        <div style={{ width: "100%" }}>
          <p
            style={{
              margin: 0,
              padding: 0,
              fontSize: "12px",
              lineHeight: 1.5,
              color: "var(--tg-theme-text-color, #000000)",
              display: "-webkit-box",
              maxWidth: "100%",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {Title}
          </p>
          {Description && (
            <p
              style={{
                margin: "0",
                padding: 0,
                fontSize: "12px",
                lineHeight: 1.25,
                color: "var(--tg-theme-hint-color, #999999)",
                display: "-webkit-box",
                maxWidth: "100%",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {Description}
            </p>
          )}
        </div>
      </Box>
    </div>
  );
};

export default Community;
