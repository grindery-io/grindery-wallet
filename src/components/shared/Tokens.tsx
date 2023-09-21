import React from "react";
import { Typography } from "@mui/material";
import Address from "./Address";
import Balance from "./Balance";
import SendButton from "./SendButton";

const Tokens = () => {
  return (
    <>
      <div />
      <Balance />
      <Address />
      <SendButton />
      <div style={{ width: "100%" }}>
        <p
          style={{
            margin: "0",
            padding: "16px 0",
            textAlign: "left",
            position: "sticky",
            top: "0px",
            background: "#fff",
            zIndex: 1,
          }}
        >
          <span style={{ opacity: 0.6 }}>Tokens</span>
        </p>
        <div style={{ textAlign: "center", margin: "50px" }}>
          <Typography color="GrayText">Coming soon</Typography>
        </div>
      </div>
    </>
  );
};

export default Tokens;
