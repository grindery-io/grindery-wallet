import React from "react";
import styled from "styled-components";
import { MAX_WIDTH } from "../../constants";
import { IconButton, MenuItem, OutlinedInput, Select } from "@mui/material";
import RefreshIcon from "../icons/RefreshIcon";

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

type Props = {
  onRefresh?: () => void;
  refreshing?: boolean;
};

const AppHeader = ({ onRefresh, refreshing }: Props) => {
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
          {onRefresh && (
            <IconButton
              onClick={onRefresh}
              sx={{
                color: "#0B0C0E",
                padding: 0,
                "& svg": {
                  "-webkit-animation": "spin 0.75s linear infinite",
                  "-moz-animation": "spin 0.75s linear infinite",
                  animation: "spin 0.75s linear infinite",
                  "animation-play-state": refreshing ? "running" : "paused",
                },
              }}
            >
              <RefreshIcon />
            </IconButton>
          )}
        </div>
      </Wrapper>
    </Spacer>
  );
};

export default AppHeader;
