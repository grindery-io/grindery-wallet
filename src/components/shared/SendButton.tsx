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
  border: none;
  background: transparent;
  display: flex;
  padding: 0;
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
    font-size: 14px !important;
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
        value="Send tokens"
        onClick={() => {
          navigate("/send");
        }}
        sx={{
          width: "100%",
          backgroundColor: "var(--tg-theme-button-color, #2481cc)",
          color: "var(--tg-theme-button-text-color, #ffffff)",
          "&:hover": {
            backgroundColor: "var(--tg-theme-button-color, #2481cc)",
            color: "var(--tg-theme-button-text-color, #ffffff)",
            boxShadow: "none",
            opacity: 1,
          },
        }}
      />
    </Wrapper>
  );
};

export default SendButton;
