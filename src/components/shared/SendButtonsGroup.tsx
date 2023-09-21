import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const SendButtonsGroup = () => {
  let navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        flexWrap: "nowrap",
        marginTop: "auto",
      }}
    >
      <div style={{ flex: 1 }}>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => {
            navigate("/");
          }}
          sx={{
            textTransform: "none",
            fontWeight: "normal",
          }}
        >
          Cancel
        </Button>
      </div>
      <div style={{ flex: 1 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            textTransform: "none",
            fontWeight: "normal",
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SendButtonsGroup;
