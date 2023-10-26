import React from "react";
import { Box, Menu, Typography } from "@mui/material";
import BoardHeaderMenuButton from "./BoardHeaderMenuButton";
import BoardHeaderMenuButtonsGroup from "./BoardHeaderMenuButtonsGroup";

const BoardHeaderMenu = ({
  setHideLoader,
}: {
  setHideLoader: (a: boolean) => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <BoardHeaderMenuButton onClick={handleClick} />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          sx: { background: "var(--tg-theme-secondary-bg-color, #efeff3)" },
        }}
      >
        <Box sx={{ padding: "10px 12px" }}>
          <Typography color="hint" variant="sm" textAlign="center" mb="8px">
            Sort and order by
          </Typography>
          <BoardHeaderMenuButtonsGroup
            handleClose={handleClose}
            setHideLoader={setHideLoader}
          />
        </Box>
      </Menu>
    </>
  );
};

export default BoardHeaderMenu;
