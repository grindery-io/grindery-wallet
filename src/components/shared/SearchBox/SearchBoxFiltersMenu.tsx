import React from "react";
import { Box, Button, ListItemText, Menu, MenuItem } from "@mui/material";
import { SearchBoxProps } from "./SearchBox";
import SearchBoxFiltersMenuItem from "./SearchBoxFiltersMenuItem";

interface SearchBoxFiltersMenuProps extends SearchBoxProps {
  open: boolean;
  handleClose: () => void;
  anchorEl: null | HTMLElement;
}

const SearchBoxFiltersMenu = (props: SearchBoxFiltersMenuProps) => {
  const { placeholder, filters, open, handleClose, anchorEl } = props;

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        sx: { background: "var(--tg-theme-secondary-bg-color, #efeff3)" },
      }}
    >
      <MenuItem sx={{ marginBottom: 0, minHeight: "auto" }} disabled>
        <ListItemText
          sx={{
            "& .MuiTypography-root": {
              fontSize: "14px",
              color: "var(--tg-theme-text-color, #000000)",
            },
          }}
        >
          Filter {placeholder}
        </ListItemText>
      </MenuItem>
      {filters &&
        filters.length > 0 &&
        filters.map((filter) => (
          <SearchBoxFiltersMenuItem {...props} filter={filter} />
        ))}
      <Box sx={{ padding: "6px 16px" }}>
        <Button fullWidth variant="outlined" size="small" onClick={handleClose}>
          Search
        </Button>
      </Box>
    </Menu>
  );
};

export default SearchBoxFiltersMenu;
