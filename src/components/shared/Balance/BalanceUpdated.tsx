import React from "react";
import { Typography } from "@mui/material";
import moment from "moment";
import { selectAppStore, useAppSelector } from "../../../store";
import BalanceUpdatedButton from "./BalanceUpdatedButton";

const BalanceUpdated = () => {
  const {
    balance: { updated },
  } = useAppSelector(selectAppStore);

  return (
    <Typography variant="xs" component="div" sx={BalanceUpdatedStyles}>
      <Typography
        variant="xs"
        color="hint"
        component="span"
        sx={{ fontWeight: "inherit" }}
      >
        Updated {moment(updated).fromNow()}.{" "}
      </Typography>
      {moment(updated) < moment(new Date()).add(-1, "minute") && (
        <BalanceUpdatedButton />
      )}
    </Typography>
  );
};

const BalanceUpdatedStyles = {
  fontWeight: "300",
  minHeight: "24px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
};

export default BalanceUpdated;
