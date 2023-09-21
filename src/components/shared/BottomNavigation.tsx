import React from "react";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { default as MuiBottomNavigation } from "@mui/material/BottomNavigation";
import FilterIcon from "@mui/icons-material/Filter";
import { MAX_WIDTH } from "../../constants";
import { SvgIcon } from "@mui/material";
import useAppContext from "../../hooks/useAppContext";

const BottomNavigation = () => {
  const {
    state: { activeTab },
    setState,
  } = useAppContext();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setState({ activeTab: newValue });
  };

  return (
    <>
      <div style={{ height: "20px" }} />
      <MuiBottomNavigation
        showLabels
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          maxWidth: MAX_WIDTH,
          borderTop: "1px solid rgb(220,220,220)",
          "& .MuiBottomNavigationAction-root": {
            minWidth: "auto",
          },
          "& .MuiBottomNavigationAction-label": {
            marginTop: "3px",
            fontSize: "12px !important",
          },
        }}
        value={activeTab}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Tokens"
          value="tokens"
          icon={
            <SvgIcon sx={{ width: "20px", height: "20px" }}>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2836_1283)">
                  <path
                    d="M23.0609 7.52993C23.5786 7.52993 23.9982 7.11027 23.9982 6.59256V5.60834C23.9982 3.02206 21.8941 0.917969 19.3078 0.917969C19.3078 0.917969 4.61429 0.920172 4.57807 0.924437C3.34126 0.967649 2.15321 1.49838 1.29683 2.39572C0.419042 3.31546 -0.0385774 4.51172 0.00449434 5.77036C0.00271336 5.79421 0.001776 19.2902 0.001776 19.2902C0.001776 22.3934 2.52637 24.918 5.6295 24.918H19.3078C21.8941 24.918 23.9982 22.8139 23.9982 20.2276V13.1108C23.9982 10.5245 21.8941 8.42042 19.3078 8.42042H4.68853C3.18355 8.42042 1.94971 7.24412 1.87954 5.74247C1.84388 4.9789 2.11857 4.25001 2.65296 3.69003C3.19508 3.12199 3.95645 2.79625 4.74178 2.79625C4.76947 2.79625 19.3078 2.79269 19.3078 2.79269C20.8603 2.79269 22.1234 4.05578 22.1234 5.60834V6.59256C22.1235 7.11027 22.5431 7.52993 23.0609 7.52993ZM4.68853 10.2951H19.3078C20.8604 10.2951 22.1234 11.5582 22.1234 13.1108V20.2276C22.1234 21.7802 20.8604 23.0432 19.3078 23.0432H5.6295C3.56009 23.0432 1.8765 21.3597 1.8765 19.2902V9.36158C2.66051 9.94883 3.63466 10.2951 4.68853 10.2951ZM20.2488 16.6692C20.2488 17.3163 19.7242 17.8409 19.0771 17.8409C17.5228 17.7792 17.5233 15.559 19.0771 15.4975C19.7242 15.4975 20.2488 16.0221 20.2488 16.6692ZM20.2488 5.60834C20.2488 5.09063 19.8291 4.67097 19.3114 4.67097H4.68858C3.44489 4.72047 3.44583 6.49662 4.68858 6.5457H19.3114C19.8291 6.5457 20.2488 6.12604 20.2488 5.60834Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2836_1283">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 0.917969)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </SvgIcon>
          }
        />
        <BottomNavigationAction
          label="Contacts"
          value="contacts"
          icon={
            <SvgIcon sx={{ width: "20px", height: "20px" }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.8667 9.79996C5.8667 6.41261 8.61269 3.66663 12 3.66663C15.3874 3.66663 18.1334 6.41261 18.1334 9.79996C18.1334 13.1873 15.3874 15.9333 12 15.9333C8.61269 15.9333 5.8667 13.1873 5.8667 9.79996ZM12 5.66663C9.71726 5.66663 7.8667 7.51718 7.8667 9.79996C7.8667 12.0827 9.71726 13.9333 12 13.9333C14.2828 13.9333 16.1334 12.0827 16.1334 9.79996C16.1334 7.51718 14.2828 5.66663 12 5.66663Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.53141 19.9739C6.50792 17.9849 9.1961 16.8665 12.0001 16.8665C14.8041 16.8665 17.4923 17.9849 19.4688 19.9739C19.8581 20.3656 19.8561 20.9988 19.4644 21.3881C19.0726 21.7774 18.4395 21.7754 18.0502 21.3836C16.4491 19.7725 14.2715 18.8665 12.0001 18.8665C9.7287 18.8665 7.55112 19.7725 5.95004 21.3836C5.56074 21.7754 4.92758 21.7774 4.53583 21.3881C4.14409 20.9988 4.14211 20.3656 4.53141 19.9739Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                  fill="currentColor"
                />
              </svg>
            </SvgIcon>
          }
        />
        <BottomNavigationAction
          label="NFTs"
          value="nfts"
          icon={<FilterIcon sx={{ maxWidth: "20px", maxHeight: "20px" }} />}
        />
        <BottomNavigationAction
          label="Rewards"
          value="rewards"
          icon={
            <SvgIcon sx={{ width: "20px", height: "20px" }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_3554_468)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C9.94286 2 8.03359 2.62008 6.44515 3.68335C5.9862 3.99056 5.36509 3.86755 5.05788 3.4086C4.75067 2.94964 4.87368 2.32854 5.33263 2.02133C7.23998 0.744586 9.53455 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C9.53455 24 7.23998 23.2554 5.33263 21.9787C4.87368 21.6715 4.75067 21.0504 5.05788 20.5914C5.36509 20.1325 5.9862 20.0094 6.44515 20.3167C8.03359 21.3799 9.94286 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM1.22222 7.11111C1.22222 6.55883 1.66994 6.11111 2.22222 6.11111H4.66667C5.21895 6.11111 5.66667 6.55883 5.66667 7.11111C5.66667 7.6634 5.21895 8.11111 4.66667 8.11111H2.22222C1.66994 8.11111 1.22222 7.6634 1.22222 7.11111ZM12 6.11111C12.5523 6.11111 13 6.55883 13 7.11111L13 7.7982C13.5924 7.81299 14.2122 7.85642 14.6852 7.97374C15.2212 8.10669 15.548 8.64902 15.415 9.18507C15.2821 9.72111 14.7398 10.0479 14.2037 9.91492C13.7407 9.80009 12.8863 9.78687 12.0067 9.79274C11.9309 9.79324 11.8781 9.79287 11.835 9.79185C11.8129 9.79133 11.7953 9.79068 11.7807 9.79008L11.7551 9.789L11.7546 9.78898C11.7485 9.78873 11.7203 9.78758 11.5402 9.79234C11.152 9.80473 10.8788 9.89194 10.7313 9.99353C10.6668 10.038 10.6311 10.0813 10.6084 10.1245C10.5857 10.1677 10.5558 10.249 10.5556 10.3974C10.5553 10.5341 10.5864 10.5974 10.6066 10.629C10.6304 10.6661 10.6801 10.721 10.7918 10.781C11.0398 10.9142 11.4595 10.9999 12 10.9999C12.6524 10.9999 13.4614 11.069 14.1381 11.4172C14.4936 11.6001 14.8337 11.8708 15.0806 12.2631C15.3292 12.6579 15.4444 13.1141 15.4444 13.6041C15.4444 14.5085 14.9623 15.1587 14.3282 15.5561C13.9308 15.8051 13.4678 15.9627 13 16.063L13 16.8889C13 17.4412 12.5523 17.8889 12 17.8889C11.4477 17.8889 11 17.4412 11 16.8889L11 16.1741C10.5709 16.1633 10.1044 16.1318 9.43152 16.0477C8.8835 15.9792 8.49478 15.4794 8.56328 14.9314C8.63178 14.3834 9.13157 13.9947 9.67959 14.0632C10.6483 14.1842 11.0939 14.1818 11.7999 14.178C11.863 14.1777 11.9281 14.1773 11.9959 14.177C12.051 14.1768 12.1078 14.1766 12.1666 14.1765C12.6921 14.1101 13.0567 13.9926 13.2662 13.8613C13.3649 13.7995 13.4033 13.7506 13.4179 13.7267C13.4286 13.7092 13.4444 13.678 13.4444 13.6041C13.4444 13.4332 13.4069 13.3585 13.3881 13.3286C13.3677 13.2962 13.3259 13.2485 13.223 13.1956C12.983 13.0721 12.5698 12.9999 12 12.9999C11.3183 12.9999 10.5147 12.9024 9.84549 12.543C9.1067 12.1462 8.55377 11.43 8.55556 10.394C8.55713 9.48585 8.96002 8.78512 9.59671 8.34651C10.0291 8.04866 10.5275 7.8985 11 7.83322L11 7.11111C11 6.55883 11.4477 6.11111 12 6.11111ZM0 12C0 11.4477 0.447715 11 1 11H4.66667C5.21895 11 5.66667 11.4477 5.66667 12C5.66667 12.5523 5.21895 13 4.66667 13H1C0.447715 13 0 12.5523 0 12ZM1.22222 16.8889C1.22222 16.3366 1.66994 15.8889 2.22222 15.8889H4.66667C5.21895 15.8889 5.66667 16.3366 5.66667 16.8889C5.66667 17.4412 5.21895 17.8889 4.66667 17.8889H2.22222C1.66994 17.8889 1.22222 17.4412 1.22222 16.8889Z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </SvgIcon>
          }
        />
        <BottomNavigationAction
          label="Activity"
          value="activity"
          icon={
            <SvgIcon sx={{ width: "20px", height: "20px" }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 6H23C23.2652 6 23.5196 5.89464 23.7071 5.70711C23.8946 5.51957 24 5.26522 24 5C24 4.73478 23.8946 4.48043 23.7071 4.29289C23.5196 4.10536 23.2652 4 23 4H7C6.73478 4 6.48043 4.10536 6.29289 4.29289C6.10536 4.48043 6 4.73478 6 5C6 5.26522 6.10536 5.51957 6.29289 5.70711C6.48043 5.89464 6.73478 6 7 6Z"
                  fill="currentColor"
                />
                <path
                  d="M23 11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H23C23.2652 13 23.5196 12.8946 23.7071 12.7071C23.8946 12.5196 24 12.2652 24 12C24 11.7348 23.8946 11.4804 23.7071 11.2929C23.5196 11.1054 23.2652 11 23 11Z"
                  fill="currentColor"
                />
                <path
                  d="M23 18H7C6.73478 18 6.48043 18.1054 6.29289 18.2929C6.10536 18.4804 6 18.7348 6 19C6 19.2652 6.10536 19.5196 6.29289 19.7071C6.48043 19.8946 6.73478 20 7 20H23C23.2652 20 23.5196 19.8946 23.7071 19.7071C23.8946 19.5196 24 19.2652 24 19C24 18.7348 23.8946 18.4804 23.7071 18.2929C23.5196 18.1054 23.2652 18 23 18Z"
                  fill="currentColor"
                />
                <path
                  d="M2 7C3.10457 7 4 6.10457 4 5C4 3.89543 3.10457 3 2 3C0.89543 3 0 3.89543 0 5C0 6.10457 0.89543 7 2 7Z"
                  fill="currentColor"
                />
                <path
                  d="M2 14C3.10457 14 4 13.1046 4 12C4 10.8954 3.10457 10 2 10C0.89543 10 0 10.8954 0 12C0 13.1046 0.89543 14 2 14Z"
                  fill="currentColor"
                />
                <path
                  d="M2 21C3.10457 21 4 20.1046 4 19C4 17.8954 3.10457 17 2 17C0.89543 17 0 17.8954 0 19C0 20.1046 0.89543 21 2 21Z"
                  fill="currentColor"
                />
              </svg>
            </SvgIcon>
          }
        />
      </MuiBottomNavigation>
    </>
  );
};

export default BottomNavigation;
