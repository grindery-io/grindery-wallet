import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { TOKENS } from "../../constants";
import { Box, Stack, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../store";

const SelectToken = () => {
  const {
    balance: { value: balance },
  } = useAppSelector(selectAppStore);
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      spacing="16px"
      sx={{
        padding: "10px 10px 10px 20px",
        width: "100%",
        borderRadius: "10px",

        backgroundColor: "var(--tg-theme-secondary-bg-color, #efeff3)",
      }}
    >
      <img
        src={TOKENS[0].icon}
        alt=""
        style={{
          display: "block",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
        }}
      />
      <Box>
        <Typography variant="sm" sx={{ lineHeight: 1.5 }}>
          G1{" "}
          <span style={{ color: "var(--tg-theme-hint-color, #999999)" }}>
            on Polygon blockchain
          </span>
        </Typography>
        <Typography variant="xs" sx={{ lineHeight: 1.5 }} color="hint">
          Balance: {balance}
        </Typography>
      </Box>
      <ArrowDropDownIcon
        sx={{
          padding: "8px",
          marginLeft: "auto",
          color: "var(--tg-theme-hint-color, #999999)",
          opacity: 0.2,
        }}
      />
    </Stack>
  );
};

export default SelectToken;
