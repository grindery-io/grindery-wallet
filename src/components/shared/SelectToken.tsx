import React from "react";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useAppContext from "../../hooks/useAppContext";

const Wrapper = styled.div`
  border-radius: 10px;
  border: 1px solid var(--grindery-solids-light-grey, #d3deec);
  background: var(--grindery-solids-white, #fff);
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
        src="https://app.grindery.io/logo192.png"
        alt=""
        style={{
          display: "block",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
        }}
      />
      <div>
        <p style={{ fontSize: "14px", margin: 0, lineHeight: 1.5 }}>
          G1 <span style={{ opacity: 0.6 }}>on Polygon blockchain</span>
        </p>
        <p
          style={{ fontSize: "12px", margin: 0, lineHeight: 1.5, opacity: 0.6 }}
        >
          Balance: {balance}
        </p>
      </div>
      <ArrowDropDownIcon
        sx={{ padding: "8px", marginLeft: "auto", opacity: 0.3 }}
      />
    </Wrapper>
  );
};

export default SelectToken;
