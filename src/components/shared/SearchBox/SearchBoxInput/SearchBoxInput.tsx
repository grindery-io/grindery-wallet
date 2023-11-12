import React from "react";
import { IconButton, InputBase } from "@mui/material";
import { ICONS } from "../../../../constants";
import { SearchBoxProps } from "../SearchBox";

const SearchBoxInput = ({ value, placeholder, onChange }: SearchBoxProps) => {
  return (
    <InputBase
      data-testid="search-box-input"
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
  );
};

export default SearchBoxInput;
