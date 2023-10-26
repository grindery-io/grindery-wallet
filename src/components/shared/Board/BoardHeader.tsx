import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import BoardHeaderStatus from "./BoardHeaderStatus";
import BoardHeaderMenu from "./BoardHeaderMenu";

const BoardHeader = ({
  setHideLoader,
}: {
  setHideLoader: (a: boolean) => void;
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap="16px"
      sx={BoardHeaderStyles}
    >
      <Box>
        <Typography variant="md">Leaderboard</Typography>
        <BoardHeaderStatus />
      </Box>
      <BoardHeaderMenu setHideLoader={setHideLoader} />
    </Stack>
  );
};

const BoardHeaderStyles = {
  padding: "10px 16px",
  backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
  position: "sticky",
  top: 0,
  borderBottom: "1px solid var(--gr-theme-divider-color)",
  minHeight: "56px",
};

export default BoardHeader;
