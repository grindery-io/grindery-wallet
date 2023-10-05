import React from "react";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useAppContext from "../../hooks/useAppContext";
import { TOKENS } from "../../constants";

const Wrapper = styled.div`
  border-radius: 10px;
  border: none;
  background: var(--tg-theme-secondary-bg-color, #efeff3);
  display: flex;
  width: 100%;
  padding: 10px 10px 10px 20px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;
`;

const SelectToken = () => {
  const {
    state: { balance },
  } = useAppContext();
  return (
    <Wrapper>
      <img
        src={TOKENS[0].icon}
        alt=""
        style={{
          display: "block",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
        }}
      />
      <div>
        <p
          style={{
            fontSize: "14px",
            margin: 0,
            lineHeight: 1.5,
            color: "var(--tg-theme-text-color, #000000)",
          }}
        >
          G1{" "}
          <span style={{ color: "var(--tg-theme-hint-color, #999999)" }}>
            on Polygon blockchain
          </span>
        </p>
        <p
          style={{
            fontSize: "12px",
            margin: 0,
            lineHeight: 1.5,
            color: "var(--tg-theme-hint-color, #999999)",
          }}
        >
          Balance: {balance}
        </p>
      </div>
      <ArrowDropDownIcon
        sx={{
          padding: "8px",
          marginLeft: "auto",
          color: "var(--tg-theme-hint-color, #999999)",
          opacity: 0.2,
        }}
      />
    </Wrapper>
  );
};

export default SelectToken;
