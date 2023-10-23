import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { formatBalance } from "../../../utils/formatBalance";
import { useNavigate } from "react-router";
import { selectAppStore, useAppSelector } from "../../../store";

const BalanceValue = () => {
  const {
    balance: { value },
  } = useAppSelector(selectAppStore);
  const navigate = useNavigate();
  const { full } = formatBalance(value);
  const [clicked, setClicked] = useState(0);

  useEffect(() => {
    let timeout: any;
    if (clicked >= 10) {
      setClicked(0);
      navigate("/debug");
    } else if (clicked > 0) {
      timeout = setTimeout(() => {
        setClicked(0);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [clicked, navigate]);

  return (
    <Box textAlign="center">
      <Typography
        component="span"
        variant="balance"
        onClick={() => {
          setClicked(clicked + 1);
        }}
        sx={{
          WebkitUserSelect: "none",
          userSelect: "none",
        }}
      >
        {full.toLocaleString()}{" "}
      </Typography>
      <Typography component="span" variant="md">
        G1
      </Typography>
    </Box>
  );
};

export default BalanceValue;
