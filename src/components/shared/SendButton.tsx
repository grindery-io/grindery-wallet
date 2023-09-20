import React from "react";
import Button from "./Button";
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

const SendButton = () => {
  const {
    state: { user },
  } = useAppContext();
  return (
    <Wrapper>
      <Button
        variant="contained"
        color="secondary"
        icon={<img src={ICONS.ARROW_OPEN} alt="" />}
        fullWidth
        disabled={!user?.patchwallet}
        value="Send"
        onClick={() => {
          alert("Coming soon");
        }}
        sx={{ width: "100%" }}
      />
    </Wrapper>
  );
};

export default SendButton;
