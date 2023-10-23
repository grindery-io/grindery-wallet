import React from "react";
import { Box, SxProps } from "@mui/material";
import SearchBoxInput from "./SearchBoxInput";
import SearchBoxFilters from "./SearchBoxFilters";

export type Filter = {
  key: string;
  label: string;
  value: string | number | boolean;
  isActive: boolean;
  type: "checkbox" | "radio";
  onChange: (value: string | number | boolean) => void;
  count?: number;
};

export type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  sx?: SxProps | React.CSSProperties;
  filters?: Filter[];
  hideCount?: boolean;
  hideBadge?: boolean;
};

const SearchBox = (props: SearchBoxProps) => {
  const { sx, filters } = props;

  return (
    <Box
      sx={{
        ...SearchBoxStyles,
        ...(sx || {}),
      }}
    >
      <SearchBoxInput {...props} />

      {filters && filters.length > 0 && <SearchBoxFilters {...props} />}
    </Box>
  );
};

const SearchBoxStyles: React.CSSProperties = {
  padding: "16px 16px 6px",
  backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
  position: "sticky",
  top: "0px",
  width: "100%",
  boxSizing: "border-box",
  zIndex: 1,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "nowrap",
  gap: "8px",
};

export default SearchBox;
