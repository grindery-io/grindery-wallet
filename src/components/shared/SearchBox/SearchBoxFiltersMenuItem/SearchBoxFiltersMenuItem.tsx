import React from "react";
import { Checkbox, ListItemText, MenuItem, Radio } from "@mui/material";
import { Filter, SearchBoxProps } from "../SearchBox";

interface SearchBoxFiltersMenuItemProps extends SearchBoxProps {
  filter: Filter;
}

const SearchBoxFiltersMenuItem = (props: SearchBoxFiltersMenuItemProps) => {
  const { filter, hideCount } = props;

  switch (filter.type) {
    case "radio":
      return (
        <MenuItem
          sx={{
            minHeight: "auto",
          }}
          key={filter.key}
          onClick={() => {
            filter.onChange(filter.key);
          }}
        >
          <Radio
            name="filter"
            size="small"
            checked={filter.value as boolean}
            sx={{
              padding: "4px",
              color: "var(--tg-theme-button-color, #2481cc)",
              "&.Mui-checked": {
                color: "var(--tg-theme-button-color, #2481cc)",
              },
            }}
          />
          <ListItemText
            primary={filter.label}
            sx={{ color: "var(--tg-theme-text-color, #000000)" }}
          />
          {!hideCount && filter.count && (
            <span
              style={{
                marginLeft: "20px",
                fontSize: "14px",
                color: "var(--tg-theme-hint-color, #999999)",
              }}
            >
              ({filter.count})
            </span>
          )}
        </MenuItem>
      );
    default:
      return (
        <MenuItem
          sx={{
            minHeight: "auto",
          }}
          key={filter.key}
          onClick={() => {
            filter.onChange(!filter.value);
          }}
        >
          <Checkbox
            size="small"
            checked={filter.value as boolean}
            sx={{
              padding: "4px",
              color: "var(--tg-theme-button-color, #2481cc)",
              "&.Mui-checked": {
                color: "var(--tg-theme-button-color, #2481cc)",
              },
            }}
          />
          <ListItemText
            primary={filter.label}
            sx={{ color: "var(--tg-theme-text-color, #000000)" }}
          />
          {!hideCount && filter.count && (
            <span
              style={{
                marginLeft: "20px",
                fontSize: "14px",
                color: "var(--tg-theme-hint-color, #999999)",
              }}
            >
              ({filter.count})
            </span>
          )}
        </MenuItem>
      );
  }
};

export default SearchBoxFiltersMenuItem;
