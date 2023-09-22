import React from "react";
import styled from "styled-components";
import { MAX_WIDTH } from "../../constants";
import { MenuItem, OutlinedInput, Select } from "@mui/material";

const Spacer = styled.div`
  height: 41px;
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 14px 20px;
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
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 5C13.3807 5 14.5 3.88071 14.5 2.5C14.5 1.11929 13.3807 0 12 0C10.6193 0 9.5 1.11929 9.5 2.5C9.5 3.88071 10.6193 5 12 5Z"
              fill="#0B0D17"
            />
            <path
              d="M12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5Z"
              fill="#0B0D17"
            />
            <path
              d="M12 24C13.3807 24 14.5 22.8807 14.5 21.5C14.5 20.1193 13.3807 19 12 19C10.6193 19 9.5 20.1193 9.5 21.5C9.5 22.8807 10.6193 24 12 24Z"
              fill="#0B0D17"
            />
          </svg>
        </div>
      </Wrapper>
    </Spacer>
  );
};

export default AppHeader;
