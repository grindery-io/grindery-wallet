import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const ContactsIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      sx={{ ...(props.sx || {}), width: "20px", height: "20px" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
      >
        <g clipPath="url(#clip0_1843_78)">
          <path
            d="M7.89941 13C7.0094 13 6.13937 12.7361 5.39935 12.2416C4.65933 11.7471 4.08255 11.0443 3.74196 10.2221C3.40136 9.39981 3.31225 8.49501 3.48588 7.6221C3.65951 6.74918 4.0881 5.94736 4.71743 5.31802C5.34677 4.68868 6.14859 4.2601 7.02151 4.08647C7.89442 3.91283 8.79922 4.00195 9.62149 4.34254C10.4438 4.68314 11.1466 5.25991 11.641 5.99994C12.1355 6.73996 12.3994 7.60999 12.3994 8.5C12.3981 9.69307 11.9236 10.8369 11.0799 11.6805C10.2363 12.5241 9.09248 12.9987 7.89941 13ZM7.89941 6C7.40496 6 6.92161 6.14662 6.51049 6.42133C6.09937 6.69603 5.77893 7.08648 5.58972 7.54329C5.4005 8.00011 5.35099 8.50278 5.44745 8.98773C5.54391 9.47268 5.78202 9.91814 6.13165 10.2678C6.48128 10.6174 6.92674 10.8555 7.41169 10.952C7.89664 11.0484 8.39931 10.9989 8.85612 10.8097C9.31294 10.6205 9.70338 10.3001 9.97809 9.88893C10.2528 9.4778 10.3994 8.99446 10.3994 8.5C10.3994 7.83696 10.136 7.20108 9.66718 6.73223C9.19834 6.26339 8.56246 6 7.89941 6ZM15.3994 23V22.5C15.3994 20.5109 14.6092 18.6032 13.2027 17.1967C11.7962 15.7902 9.88854 15 7.89941 15C5.91029 15 4.00264 15.7902 2.59611 17.1967C1.18959 18.6032 0.399414 20.5109 0.399414 22.5L0.399414 23C0.399414 23.2652 0.504771 23.5196 0.692307 23.7071C0.879844 23.8946 1.1342 24 1.39941 24C1.66463 24 1.91898 23.8946 2.10652 23.7071C2.29406 23.5196 2.39941 23.2652 2.39941 23V22.5C2.39941 21.0413 2.97888 19.6424 4.01033 18.6109C5.04178 17.5795 6.44072 17 7.89941 17C9.3581 17 10.7571 17.5795 11.7885 18.6109C12.82 19.6424 13.3994 21.0413 13.3994 22.5V23C13.3994 23.2652 13.5048 23.5196 13.6923 23.7071C13.8798 23.8946 14.1342 24 14.3994 24C14.6646 24 14.919 23.8946 15.1065 23.7071C15.2941 23.5196 15.3994 23.2652 15.3994 23ZM24.3994 18C24.3994 16.6487 24.0082 15.3263 23.2731 14.1924C22.538 13.0585 21.4905 12.1616 20.2569 11.61C19.0233 11.0584 17.6564 10.8756 16.3212 11.0837C14.986 11.2919 13.7396 11.8821 12.7324 12.783C12.6332 12.8702 12.5522 12.9762 12.4942 13.0949C12.4361 13.2135 12.4022 13.3425 12.3943 13.4744C12.3864 13.6063 12.4047 13.7384 12.4482 13.8631C12.4916 13.9879 12.5594 14.1028 12.6475 14.2012C12.7356 14.2996 12.8423 14.3796 12.9615 14.4366C13.0807 14.4935 13.21 14.5262 13.342 14.5329C13.4739 14.5396 13.6059 14.5201 13.7302 14.4754C13.8545 14.4308 13.9688 14.362 14.0664 14.273C14.7859 13.6296 15.6762 13.2082 16.6298 13.0597C17.5835 12.9111 18.5598 13.0417 19.4408 13.4358C20.3219 13.8299 21.0701 14.4705 21.595 15.2804C22.12 16.0903 22.3994 17.0348 22.3994 18C22.3994 18.2652 22.5048 18.5196 22.6923 18.7071C22.8798 18.8946 23.1342 19 23.3994 19C23.6646 19 23.919 18.8946 24.1065 18.7071C24.2941 18.5196 24.3994 18.2652 24.3994 18ZM17.8994 9C17.0094 9 16.1394 8.73608 15.3993 8.24162C14.6593 7.74715 14.0826 7.04434 13.742 6.22208C13.4014 5.39981 13.3122 4.49501 13.4859 3.6221C13.6595 2.74918 14.0881 1.94736 14.7174 1.31802C15.3468 0.688685 16.1486 0.260102 17.0215 0.0864683C17.8944 -0.0871652 18.7992 0.00194979 19.6215 0.342544C20.4438 0.683138 21.1466 1.25991 21.641 1.99994C22.1355 2.73996 22.3994 3.60999 22.3994 4.5C22.3981 5.69307 21.9236 6.83689 21.0799 7.68052C20.2363 8.52415 19.0925 8.99868 17.8994 9ZM17.8994 2C17.405 2 16.9216 2.14662 16.5105 2.42133C16.0994 2.69603 15.7789 3.08648 15.5897 3.54329C15.4005 4.00011 15.351 4.50278 15.4475 4.98773C15.5439 5.47268 15.782 5.91814 16.1316 6.26777C16.4813 6.6174 16.9267 6.8555 17.4117 6.95197C17.8966 7.04843 18.3993 6.99892 18.8561 6.8097C19.3129 6.62048 19.7034 6.30005 19.9781 5.88893C20.2528 5.4778 20.3994 4.99446 20.3994 4.5C20.3994 3.83696 20.136 3.20108 19.6672 2.73223C19.1983 2.26339 18.5625 2 17.8994 2Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_1843_78">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0.399414)"
            />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
};

export default ContactsIcon;