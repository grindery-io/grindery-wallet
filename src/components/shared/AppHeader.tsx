import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { MAX_WIDTH, SCREEN } from "../../constants";
import { useNavigate } from "react-router";

const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 10px;
  position: fixed;

  top: 0;
  background: #ffffff;
  width: 100%;
  max-width: ${MAX_WIDTH};
  box-sizing: border-box;
  z-index: 2;
  border-bottom: 1px solid rgb(220, 220, 220);
  @media (min-width: ${SCREEN.TABLET}) {
    width: 100%;
    top: 0;
    max-width: ${MAX_WIDTH};
  }
`;

const LogoWrapper = styled.a`
  display: block;
  text-decoration: none;
  @media (min-width: ${SCREEN.TABLET}) {
    order: 2;
  }
`;

const CompanyNameWrapper = styled.a`
  display: block;
  order: 3;
  font-weight: 700;
  font-size: 20px;
  line-height: 110%;
  color: #0b0d17;
  cursor: pointer;
  text-decoration: none;
`;

type Props = {};

const AppHeader = (props: Props) => {
  let navigate = useNavigate();

  return (
    <Wrapper>
      <LogoWrapper
        href="/"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        <Logo variant="square" />
      </LogoWrapper>
      <CompanyNameWrapper
        href="/"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        Wallet
      </CompanyNameWrapper>
    </Wrapper>
  );
};

export default AppHeader;
