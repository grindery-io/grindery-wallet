import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router";

type Props = {};

const SendButton = (props: Props) => {
  let navigate = useNavigate();
  return (
    <div
      style={{
        maxWidth: "320px",
        margin: "0 auto",
      }}
    >
      <Button
        value="Send"
        onClick={() => {
          navigate("/send");
        }}
      />
    </div>
  );
};

export default SendButton;
