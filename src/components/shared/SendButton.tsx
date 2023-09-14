import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router";
import useAppContext from "../../hooks/useAppContext";

type Props = {};

const SendButton = (props: Props) => {
  let navigate = useNavigate();
  const {state: {user}} = useAppContext();
  return (
    <div
      style={{
        maxWidth: "320px",
        margin: "0 auto",
      }}
    >
      <Button
      disabled={!user?.patchwallet}
        value="Send"
        onClick={() => {
          navigate("/send");
        }}
      />
    </div>
  )
};

export default SendButton;
