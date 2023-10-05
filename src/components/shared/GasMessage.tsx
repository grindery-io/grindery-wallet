import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  padding: 20px 16px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;

  & p {
    font-size: 14px;
    font-weight: 300;
    line-height: 125%;
  }
`;

const GasMessage = () => {
  return (
    <Wrapper>
      <p>Grindery pays the gas fees for you 🥰</p>
    </Wrapper>
  );
};

export default GasMessage;
