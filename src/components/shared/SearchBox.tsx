import React from "react";
import {
  Badge,
  Box,
  Button,
  Checkbox,
  IconButton,
  InputBase,
  ListItemText,
  Menu,
  MenuItem,
  SxProps,
} from "@mui/material";
import { ICONS } from "../../constants";
import TuneIcon from "@mui/icons-material/Tune";

export type SearchOption = {
  label: string;
  value: string;
  count?: number;
};

export type Filter = {
  key: string;
  label: string;
  value: string | number | boolean;
  isActive: boolean;
  type: "checkbox";
  onChange: (value: string | number | boolean) => void;
  count?: number;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  sx?: SxProps | React.CSSProperties;
  filters?: Filter[];
};

const SearchBox = ({ value, placeholder, sx, filters, onChange }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        padding: "16px 16px 6px",
        backgroundColor: "#fff",
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
        ...(sx || {}),
      }}
    >
      <InputBase
        name="search"
        placeholder={placeholder}
        startAdornment={
          <span style={{ marginRight: "8px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              style={{ display: "block" }}
            >
              <path
                d="M17.7009 16.2963L13.2865 11.8765C15.506 8.98766 15.2841 4.81482 12.6206 2.17284C11.1656 0.716049 9.29128 0 7.39233 0C5.49338 0 3.6191 0.716049 2.16406 2.17284C-0.721353 5.06173 -0.721353 9.75309 2.16406 12.642C3.6191 14.0988 5.49338 14.8148 7.39233 14.8148C8.97068 14.8148 10.549 14.321 11.8561 13.3086L16.2952 17.7037C16.4925 17.9012 16.7391 18 17.0104 18C17.257 18 17.5283 17.9012 17.7256 17.7037C18.0955 17.3333 18.0955 16.6914 17.7009 16.2963ZM7.41699 12.8148C5.96196 12.8148 4.63023 12.2469 3.59444 11.2346C1.4982 9.1358 1.4982 5.7037 3.59444 3.58025C4.60556 2.5679 5.96196 2 7.41699 2C8.87203 2 10.2038 2.5679 11.2395 3.58025C12.2753 4.59259 12.8179 5.95062 12.8179 7.40741C12.8179 8.8642 12.2507 10.1975 11.2395 11.2346C10.2284 12.2716 8.84737 12.8148 7.41699 12.8148Z"
                fill="#9D9D9D"
              />
            </svg>
          </span>
        }
        endAdornment={
          <>
            {value && value.length > 0 ? (
              <IconButton
                sx={{ padding: "4px" }}
                onClick={() => {
                  onChange("");
                }}
                aria-label="clear input"
              >
                <img src={ICONS.CLOSE} alt="" />
              </IconButton>
            ) : null}
          </>
        }
        fullWidth
        sx={{
          padding: "9px 8px 9px 16px",
          borderRadius: "10px",
          background: "var(--grindery-solids-bleach-grey, #F4F5F7)",
          "& .MuiInputBase-input": {
            padding: 0,
            fontSize: "16px",
            fontFamily: "Geologica",
            lineHeight: "1.5",
          },
        }}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      {filters && filters.length > 0 && (
        <Badge
          badgeContent={
            (filters && filters.filter((filter) => filter.isActive).length) || 0
          }
          color="error"
          invisible={
            !filters || filters.filter((filter) => filter.isActive).length < 1
          }
          overlap="circular"
        >
          <IconButton sx={{ padding: "4px" }} onClick={handleClick}>
            <TuneIcon />
          </IconButton>
        </Badge>
      )}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem sx={{ marginBottom: 0, minHeight: "auto" }} disabled>
          <ListItemText
            sx={{
              "& .MuiTypography-root": {
                fontSize: "14px",
              },
            }}
          >
            Filter {placeholder}
          </ListItemText>
        </MenuItem>
        {filters &&
          filters.length > 0 &&
          filters.map((filter) => {
            switch (filter.type) {
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
                      sx={{ padding: "4px" }}
                    />
                    <ListItemText primary={filter.label} />
                    {filter.count && (
                      <span
                        style={{
                          marginLeft: "20px",
                          fontSize: "14px",
                          opacity: 0.6,
                        }}
                      >
                        ({filter.count})
                      </span>
                    )}
                  </MenuItem>
                );
            }
          })}
        <MenuItem>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            sx={{
              fontSize: "12px",
              padding: "8px 16px",
              textAlign: "center",
              width: "100%",
              justifyContent: "center",
              margin: "6px 0 0",
            }}
            onClick={handleClose}
          >
            Search
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SearchBox;
