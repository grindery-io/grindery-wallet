import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router";
import useAppContext from "../../hooks/useAppContext";
import styled from "styled-components";
import { ICONS } from "../../constants";

const Wrapper = styled.div`
  width: 100%;
  & button > span {
    padding: 0;
    background: transparent;

    & img {
      padding: 0;
      background: transparent;
      border: none;
    }
  }
`;

type Props = {};

const SendButton = (props: Props) => {
  let navigate = useNavigate();
  const {
    state: { user },
  } = useAppContext();
  return (
    <Wrapper>
      <Button
        icon={ICONS.ARROW_OPEN}
        fullWidth
        disabled={!user?.patchwallet}
        value="Send"
        onClick={() => {
          navigate("/send");
        }}
      />
    </Wrapper>
  );
};

export default SendButton;
