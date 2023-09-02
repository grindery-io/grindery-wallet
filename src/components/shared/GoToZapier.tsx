import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;

  & button {
    background: #ff5858;
    border-radius: 5px;
    box-shadow: none;
    border: none;
    padding: 12px 40px;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    color: #ffffff;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    gap: 8px;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 4px 8px rgba(106, 71, 147, 0.1);
    }
  }
`;

const Title = styled.h3`
  font-weight: 700;
  font-size: 20px;
  line-height: 120%;
  text-align: center;
  color: #0b0d17;
  padding: 0;
  margin: 0 0 24px;
`;

type Props = {};

const GoToZapier = (props: Props) => {
  return (
    <Container>
      <Title>Your account is active</Title>
      <button
        onClick={() => {
          window.open(
            `https://zapier.com/apps/grindery-web3-gateway/integrations`,
            "_blank"
          );
        }}
      >
        <span>Go to Zapier to get started</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_3695_8499)">
            <path
              d="M12.748 12.2626L15.3607 9.64997C15.7849 9.20539 16.0216 8.61448 16.0216 7.99997C16.0216 7.38545 15.7849 6.79454 15.3607 6.34997L12.748 3.7373C12.5605 3.5497 12.3062 3.44428 12.0409 3.44421C11.7757 3.44415 11.5213 3.54946 11.3337 3.73697C11.1461 3.92447 11.0407 4.17882 11.0406 4.44406C11.0405 4.7093 11.1458 4.9637 11.3334 5.1513L13.1867 7.0053L1.02002 7.02063C0.754803 7.02063 0.500449 7.12599 0.312913 7.31353C0.125376 7.50106 0.0200195 7.75542 0.0200195 8.02063C0.0200195 8.28585 0.125376 8.5402 0.312913 8.72774C0.500449 8.91528 0.754803 9.02063 1.02002 9.02063L13.174 9.0053L11.3334 10.8486C11.1512 11.0372 11.0504 11.2898 11.0527 11.552C11.055 11.8142 11.1601 12.065 11.3455 12.2505C11.5309 12.4359 11.7818 12.541 12.044 12.5433C12.3061 12.5456 12.5588 12.4448 12.7474 12.2626H12.748Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_3695_8499">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </Container>
  );
};

export default GoToZapier;
