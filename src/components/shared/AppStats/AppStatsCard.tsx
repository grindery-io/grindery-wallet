import React from "react";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";

type AppStatsCardProps = {
  title: string;
  content: React.ReactNode;
  action?: React.ReactNode;
  color?: string;
  background?: string;
};

const AppStatsCard = ({
  title,
  content,
  action,
  color,
  background,
}: AppStatsCardProps) => {
  return (
    <Card
      sx={{ ...AppStatsCardStyles, background, color, flexDirection: "column" }}
    >
      <CardHeader
        title={title}
        sx={{
          ...AppStatsCardHeaderStyles,
          "& .MuiCardHeader-title": {
            fontSize: "14px",
            fontWeight: "bold",
            color,
          },
        }}
        action={action}
      />
      <Divider sx={{ marginLeft: "16px", marginRight: "16px" }} />
      <CardContent
        sx={{
          ...AppStatsCardContentStyles,
          color,
          "& .MuiTypography-root": { color },
        }}
      >
        {content}
      </CardContent>
    </Card>
  );
};

const AppStatsCardStyles = {
  boxShadow: "none",
  border: "none",
  backgroundColor: "var(--tg-theme-secondary-bg-color, #efeff3)",
  color: "var(--tg-theme-text-color, #000000)",
  height: "100%",
  display: "flex",
  alignItems: "stretch",
  justifyContent: "flex-start",
};

const AppStatsCardHeaderStyles = {
  padding: "16px",
  "& .MuiCardHeader-action": {
    marginTop: "0px",
    marginBottom: "0px",
    marginRight: 0,
  },
};

const AppStatsCardContentStyles = {
  marginTop: "auto",
  padding: "16px",
  paddingBottom: "16px !important",
};

export default AppStatsCard;
