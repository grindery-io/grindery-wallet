import React from "react";
import styled from "styled-components";
import { IMAGES } from "../../constants";
import useAppContext from "../../hooks/useAppContext";

const Img = styled.img`
  margin: 0 auto 20px;
  width: 100%;
  max-width: 500px;
  height: auto;
`;

const Title = styled.h1`
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 120%;
  text-align: center;
  color: rgba(0, 0, 0, 0.87);
  padding: 0;
  margin: 0 0 10px;
`;

const Desc = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #706e6e;
  padding: 0;
  margin: 0 0 16px;
`;

type Props = {};

const Header = (props: Props) => {
  const { user } = useAppContext();

  return (
    <>
      <Img src={IMAGES.WELCOME} alt="" />
      <Title>The no-code Web3 Gateway {user ? "- READY" : ""}</Title>
      <Desc>
        Grindery Gateway allows you to implement Zapier workflows that read and
        write data from over 10 blockchains without a single line of code and
        without having any tokens. The easiest way to Web3 is just one click
        away!
      </Desc>
    </>
  );
};

export default Header;
