import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { formatBalance } from "../../../utils/formatBalance";
import { useNavigate } from "react-router";
import { selectAppStore, useAppSelector } from "../../../store";

const BalanceValue = () => {
  const {
    balance: { value },
    debug: { features },
    tokens: { items },
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
        {features?.TOKEN_PRICE
          ? formatBalance(
              items
                .map((token) => (token.price || 0) * (token.balance || 0))
                .reduce((partialSum, a) => partialSum + a, 0)
            ).formatted
          : full.toLocaleString()}{" "}
      </Typography>
      <Typography component="span" variant="md">
        {features?.TOKEN_PRICE ? "USD" : "G1"}
      </Typography>
    </Box>
  );
};

export default BalanceValue;
