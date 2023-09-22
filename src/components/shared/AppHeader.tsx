import React from "react";
import styled from "styled-components";
import { MAX_WIDTH } from "../../constants";
import { MenuItem, OutlinedInput, Select } from "@mui/material";

const Spacer = styled.div`
  height: 41px;
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 10px;
  position: fixed;
  top: 0;
  width: 100%;
  max-width: ${MAX_WIDTH};
  box-sizing: border-box;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
  background: var(--grindery-solids-white, #fff);
  box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.1) inset;
  height: 61px;
`;

type Props = {};

const AppHeader = (props: Props) => {
  return (
    <Spacer>
      <Wrapper>
        <Select
          displayEmpty
          input={<OutlinedInput />}
          sx={{
            fontFamily: "Geologica",
            border: "none",
            fontSize: "14px",
            marginRight: "auto",
            "& .MuiSelect-select": {
              padding: "6px 12px",
              border: "none",
              "&::before": {
                content: '""',
                width: "8px",
                height: "8px",
                display: "inline-block",
                margin: "0 6px 0 0",
                borderRadius: "50%",
                background: "linear-gradient(90deg, #A726C1 0%, #7B3FE4 100%)",
              },
            },
            "& fieldset": {
              borderRadius: "34px",
              border: "1px solid #D3DEEC",
            },
          }}
          value="Polygon"
        >
          {["Polygon", "Ethereum", "Binance", "...", "more coming soon"].map(
            (name) => (
              <MenuItem key={name} value={name} disabled={name !== "Polygon"}>
                {name}
              </MenuItem>
            )
          )}
        </Select>
        <div style={{ marginLeft: "auto" }}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="16" fill="white" />
            <g clipPath="url(#clip0_1843_4548)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.9995 14.0262C14.9094 14.0262 14.0257 14.9099 14.0257 16C14.0257 17.0901 14.9094 17.9739 15.9995 17.9739C17.0897 17.9739 17.9734 17.0901 17.9734 16C17.9734 14.9099 17.0897 14.0262 15.9995 14.0262ZM12.6924 16C12.6924 14.1735 14.173 12.6929 15.9995 12.6929C17.826 12.6929 19.3067 14.1735 19.3067 16C19.3067 17.8265 17.826 19.3072 15.9995 19.3072C14.173 19.3072 12.6924 17.8265 12.6924 16Z"
                fill="#0B0C0E"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.2957 8.96561C15.0672 7.67813 16.9328 7.67813 17.7043 8.96561L18.1702 9.74308C18.3182 9.99007 18.6104 10.1111 18.8897 10.0411L19.7689 9.82079C21.2248 9.45594 22.5441 10.7752 22.1792 12.2311L21.9589 13.1103C21.8889 13.3896 22.0099 13.6818 22.2569 13.8298L23.0344 14.2957C24.3219 15.0672 24.3219 16.9328 23.0344 17.7043L22.2569 18.1702C22.0099 18.3182 21.8889 18.6104 21.9589 18.8897L22.1792 19.7689C22.5441 21.2248 21.2248 22.5441 19.7689 22.1792L18.8897 21.9589C18.6104 21.8889 18.3182 22.0099 18.1702 22.2569L17.7043 23.0344C16.9328 24.3219 15.0672 24.3219 14.2957 23.0344L13.8298 22.2569C13.6818 22.0099 13.3896 21.8889 13.1103 21.9589L12.2311 22.1792C10.7752 22.5441 9.45594 21.2248 9.82079 19.7689L10.0411 18.8897C10.1111 18.6104 9.99007 18.3182 9.74308 18.1702L8.96561 17.7043C7.67813 16.9328 7.67813 15.0672 8.96561 14.2957L9.74308 13.8298L10.0465 14.3361L9.74309 13.8298C9.99007 13.6818 10.1111 13.3896 10.0411 13.1103L9.82079 12.2311C9.45594 10.7752 10.7752 9.45594 12.2311 9.82079L13.1103 10.0411C13.3896 10.1111 13.6818 9.99007 13.8298 9.74308L14.2957 8.96561ZM16.5606 9.65096C16.3068 9.22746 15.6932 9.22746 15.4394 9.65096L14.9735 10.4284C14.5236 11.1793 13.6352 11.5472 12.7862 11.3345L11.907 11.1141C11.4281 10.9941 10.9941 11.4281 11.1141 11.907L11.3345 12.7862C11.5472 13.6352 11.1793 14.5235 10.4284 14.9735L9.65097 15.4394C9.22746 15.6932 9.22746 16.3068 9.65096 16.5606L10.4284 17.0265C11.1793 17.4764 11.5472 18.3648 11.3345 19.2138L11.1141 20.093C10.9941 20.5719 11.4281 21.0059 11.907 20.8859L12.7862 20.6655C13.6352 20.4528 14.5235 20.8207 14.9735 21.5716L15.4394 22.349C15.6932 22.7725 16.3068 22.7725 16.5606 22.349L17.0265 21.5716C17.4764 20.8207 18.3648 20.4528 19.2138 20.6655L20.093 20.8859C20.5719 21.0059 21.0059 20.5719 20.8859 20.093L20.6655 19.2138C20.4528 18.3648 20.8207 17.4765 21.5716 17.0265L22.349 16.5606C22.7725 16.3068 22.7725 15.6932 22.349 15.4394L21.5716 14.9735C20.8207 14.5236 20.4528 13.6352 20.6655 12.7862L20.8859 11.907C21.0059 11.4281 20.5719 10.9941 20.093 11.1141L19.2138 11.3345C18.3648 11.5472 17.4764 11.1793 17.0265 10.4284L16.5606 9.65096Z"
                fill="#0B0C0E"
              />
            </g>
            <defs>
              <clipPath id="clip0_1843_4548">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(8 8)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </Wrapper>
    </Spacer>
  );
};

export default AppHeader;
