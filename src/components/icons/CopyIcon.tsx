import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const CopyIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      sx={{ width: "12px", height: "12px", ...(props.sx || {}) }}
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2085_17016)">
          <path
            d="M5.91634 8.83334C6.46867 8.83268 6.99819 8.61297 7.38875 8.22242C7.77931 7.83186 7.99901 7.30234 7.99967 6.75001V3.10126C8.00032 2.88224 7.95749 2.66527 7.87367 2.46293C7.78984 2.26059 7.66669 2.0769 7.51134 1.92251L6.57718 0.988341C6.42278 0.832996 6.23909 0.709842 6.03675 0.626016C5.83441 0.54219 5.61744 0.499359 5.39842 0.500007H3.41634C2.86401 0.500669 2.33449 0.720375 1.94393 1.11093C1.55338 1.50149 1.33367 2.03101 1.33301 2.58334V6.75001C1.33367 7.30234 1.55338 7.83186 1.94393 8.22242C2.33449 8.61297 2.86401 8.83268 3.41634 8.83334H5.91634ZM2.16634 6.75001V2.58334C2.16634 2.25182 2.29804 1.93388 2.53246 1.69946C2.76688 1.46504 3.08482 1.33334 3.41634 1.33334C3.41634 1.33334 5.46592 1.33917 5.49967 1.34334V2.16667C5.49967 2.38769 5.58747 2.59965 5.74375 2.75593C5.90003 2.91221 6.11199 3.00001 6.33301 3.00001H7.15634C7.16051 3.03376 7.16634 6.75001 7.16634 6.75001C7.16634 7.08153 7.03465 7.39947 6.80023 7.63389C6.5658 7.86831 6.24786 8.00001 5.91634 8.00001H3.41634C3.08482 8.00001 2.76688 7.86831 2.53246 7.63389C2.29804 7.39947 2.16634 7.08153 2.16634 6.75001ZM9.66634 3.83334V8.41667C9.66568 8.96901 9.44597 9.49853 9.05542 9.88908C8.66486 10.2796 8.13534 10.4993 7.58301 10.5H3.83301C3.7225 10.5 3.61652 10.4561 3.53838 10.378C3.46024 10.2998 3.41634 10.1938 3.41634 10.0833C3.41634 9.97283 3.46024 9.86685 3.53838 9.78871C3.61652 9.71057 3.7225 9.66667 3.83301 9.66667H7.58301C7.91453 9.66667 8.23247 9.53498 8.46689 9.30056C8.70131 9.06614 8.83301 8.74819 8.83301 8.41667V3.83334C8.83301 3.72283 8.87691 3.61685 8.95505 3.53871C9.03319 3.46057 9.13917 3.41667 9.24967 3.41667C9.36018 3.41667 9.46616 3.46057 9.5443 3.53871C9.62244 3.61685 9.66634 3.72283 9.66634 3.83334Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_2085_17016">
            <rect
              width="10"
              height="10"
              fill="white"
              transform="translate(0.5 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
};

export default CopyIcon;