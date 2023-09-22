import React from "react";
import Button from "./Button";
import useAppContext from "../../hooks/useAppContext";
import styled from "styled-components";
import { ICONS } from "../../constants";
import { useNavigate } from "react-router";

const Wrapper = styled.div`
  width: calc(100% - 32px);
  margin: 0 16px;
  border-radius: 10px;
  border: 1px solid var(--grindery-solids-light-grey, #d3deec);
  background: var(--grindery-solids-white, #fff);
  display: flex;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 8px;
  box-sizing: border-box;
  text-align: center;

  & p {
    margin: 0;
    padding: 0;
    opacity: 0.6;
  }
  & button {
    width: 100%;
    padding: 10px 20px !important;
  }
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
  let navigate = useNavigate();
  return (
    <Wrapper>
      <p>Send tokens to your contacts</p>
      <Button
        variant="contained"
        color="secondary"
        icon={
          <img
            src={ICONS.ARROW_OPEN}
            alt=""
            style={{ width: "16px", height: "16px", display: "block" }}
          />
        }
        fullWidth
        disabled={!user?.patchwallet}
        value="Send"
        onClick={() => {
          navigate("/send");
        }}
        sx={{ width: "100%" }}
      />
    </Wrapper>
  );
};

export default SendButton;
