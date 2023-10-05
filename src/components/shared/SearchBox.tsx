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
          background: "var(--tg-theme-secondary-bg-color, #efeff3)",
          "& .MuiInputBase-input": {
            padding: 0,
            fontSize: "16px",
            fontFamily: "Geologica",
            lineHeight: "1.5",
            color: "var(--tg-theme-text-color, #000000)",
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
          <IconButton
            sx={{
              padding: "0px",
              color: "var(--tg-theme-hint-color, #999999)",
            }}
            onClick={handleClick}
          >
            <svg
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="42" height="42" rx="21" fill="transparent" />
              <g clipPath="url(#clip0_2043_1537)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.4986 22.6589V28.1042L22.4996 30.1667V22.659L29.8928 15.0349C29.8926 15.0351 29.893 15.0347 29.8928 15.0349C30.1994 14.718 30.4001 14.3263 30.47 13.9077C30.5399 13.4888 30.4763 13.0604 30.2869 12.6739C30.0976 12.2874 29.7904 11.9592 29.4024 11.7288C29.0146 11.4985 28.5625 11.3756 28.1004 11.375H13.8973C13.4351 11.3754 12.9827 11.498 12.5947 11.7282C12.2065 11.9584 11.8992 12.2865 11.7096 12.673C11.52 13.0595 11.4562 13.4879 11.526 13.9068C11.5957 14.3254 11.7958 14.7167 12.1022 15.0337C12.102 15.0335 12.1024 15.0339 12.1022 15.0337L19.4986 22.6589ZM10.9799 15.9464L17.9981 23.1817V28.3333C17.9981 28.4756 18.0343 28.616 18.1038 28.7433C18.1732 28.8706 18.274 28.9813 18.3983 29.0667L22.3995 31.8167C22.5727 31.9357 22.7833 32 22.9997 32C23.265 32 23.5195 31.9034 23.7071 31.7315C23.8947 31.5596 24.0001 31.3264 24.0001 31.0833V23.1817L31.0153 15.9473C31.5139 15.4323 31.8396 14.7962 31.9532 14.1156C32.0668 13.435 31.9635 12.7388 31.6558 12.1107C31.348 11.4826 30.8489 10.9493 30.2184 10.5748C29.5878 10.2004 28.8527 10.0008 28.1014 10H13.8968C13.1454 10.0004 12.4101 10.1997 11.7793 10.5739C11.1485 10.9481 10.6491 11.4812 10.341 12.1093C10.0329 12.7373 9.92934 13.4335 10.0427 14.1142C10.156 14.7949 10.4815 15.4311 10.9799 15.9464Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_2043_1537">
                  <rect
                    width="22"
                    height="22"
                    fill="white"
                    transform="translate(10 10)"
                  />
                </clipPath>
              </defs>
            </svg>
          </IconButton>
        </Badge>
      )}
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
                    {filter.count && (
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
          })}
        <Box sx={{ padding: "6px 16px" }}>
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
              color: "var(--tg-theme-button-color, #2481cc)",
              borderColor: "var(--tg-theme-button-color, #2481cc)",
              "&:hover": {
                color: "var(--tg-theme-button-color, #2481cc)",
                borderColor: "var(--tg-theme-button-color, #2481cc)",
                opacity: 1,
              },
            }}
            onClick={handleClose}
          >
            Search
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default SearchBox;
