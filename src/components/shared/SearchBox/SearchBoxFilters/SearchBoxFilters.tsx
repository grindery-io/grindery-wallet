import React from "react";
import { SearchBoxProps } from "../SearchBox";
import SearchBoxFiltersMenu from "../SearchBoxFiltersMenu/SearchBoxFiltersMenu";
import SearchBoxFiltersButton from "../SearchBoxFiltersButton/SearchBoxFiltersButton";

const SearchBoxFilters = (props: SearchBoxProps) => {
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
      <SearchBoxFiltersButton handleClick={handleClick} {...props} />
      <SearchBoxFiltersMenu
        open={open}
        handleClose={handleClose}
        anchorEl={anchorEl}
        {...props}
      />
    </>
  );
};

export default SearchBoxFilters;
