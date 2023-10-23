import React from "react";
import { Badge, IconButton } from "@mui/material";
import { SearchBoxProps } from "./SearchBox";

interface SearchBoxFiltersButtonProps extends SearchBoxProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SearchBoxFiltersButton = (props: SearchBoxFiltersButtonProps) => {
  const { filters, hideBadge, handleClick } = props;

  return (
    <Badge
      badgeContent={
        (filters && filters.filter((filter) => filter.isActive).length) || 0
      }
      color="error"
      invisible={
        hideBadge ||
        !filters ||
        filters.filter((filter) => filter.isActive).length < 1
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
  );
};

export default SearchBoxFiltersButton;
