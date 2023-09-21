import React, { useState } from "react";
import useBackButton from "../../hooks/useBackButton";

const SendPage = () => {
  useBackButton({ path: "/" });
  const [input, setInput] = useState({
    amount: "",
    recipient: "",
  });

  return (
    <div style={{ width: "100%", paddingTop: "16px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ margin: 0, textAlign: "center" }}>
          Send{!input.recipient ? " to" : ""}
        </p>
      </div>
    </div>
  );
};

export default SendPage;
