import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { selectAppStore, useAppSelector } from "../../../../store";
import { MAIN_TOKEN_ADDRESS } from "../../../../constants";
import { Token, TokenBalance } from "../../Token";

const BalanceValue = () => {
  const {
    balance: { value },
    debug: { features },
    tokens,
  } = useAppSelector(selectAppStore);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(0);

  const mainToken = tokens.find(
    (token) => token.address.toLowerCase() === MAIN_TOKEN_ADDRESS.toLowerCase()
  );

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
    <Box textAlign="center" data-testid="balance-value">
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
        {features?.TOKEN_PRICE ? (
          (value || 0).toFixed(2)
        ) : mainToken ? (
          <Token token={mainToken}>
            <TokenBalance format="short" />
          </Token>
        ) : (
          "0.00"
        )}
      </Typography>
      <Typography component="span" variant="md" ml="8px">
        {features?.TOKEN_PRICE ? "USD" : "G1"}
      </Typography>
    </Box>
  );
};

export default BalanceValue;
