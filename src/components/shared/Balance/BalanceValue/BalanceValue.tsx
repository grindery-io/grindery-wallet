import React, { useEffect, useState } from "react";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../../store";
import { MAIN_TOKEN_ADDRESS } from "../../../../constants";
import { Token, TokenBalance } from "../../Token";

const BalanceValue = () => {
  const dispatch = useAppDispatch();
  const {
    balance: { value, display },
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
          marginLeft: "32px",
        }}
      >
        {display === "usd" ? (
          (value || 0).toFixed(2)
        ) : mainToken ? (
          <Token token={mainToken}>
            <TokenBalance format="short" />
          </Token>
        ) : (
          "0.00"
        )}
      </Typography>
      <Select
        sx={{
          display: "inline-flex",
          marginLeft: "8px",
          fontFamily: "inherit",
          "& .MuiSelect-select": {
            padding: 0,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        value={display}
        onChange={(e) => {
          dispatch(
            appStoreActions.setBalance({
              display: e.target.value as any,
            })
          );
        }}
        inputProps={{
          name: "balance",
          id: "balance-display",
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              minWidth: "unset !important",
            },
          },
          sx: {
            "& .MuiList-root": {
              padding: "8px 8px 4px",
            },
            "& .MuiMenuItem-root": {
              borderRadius: "4px",
              padding: "2px 12px !important",
              marginBottom: "4px",
              minHeight: "unset !important",
            },
            "& .MuiMenuItem-root.Mui-selected": {
              backgroundColor:
                "var(--tg-theme-button-color, #2481cc) !important",
              color: "var(--tg-theme-button-text-color, #ffffff) !important",
            },
          },
        }}
      >
        <MenuItem value="token">{mainToken?.symbol || "G1"}</MenuItem>
        <MenuItem value="usd">USD</MenuItem>
      </Select>
    </Box>
  );
};

export default BalanceValue;
