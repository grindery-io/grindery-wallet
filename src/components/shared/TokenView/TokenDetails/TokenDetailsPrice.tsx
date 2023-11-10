import React from "react";
import TableRow from "../../TableRow";
import { selectAppStore, useAppSelector } from "../../../../store";
import { Typography } from "@mui/material";
import TokenPrice from "../../Token/TokenPrice";

const TokenDetailsPrice = () => {
  const {
    debug: { features },
  } = useAppSelector(selectAppStore);

  return features?.TOKEN_PRICE ? (
    <TableRow
      label="Price"
      value={
        <Typography
          variant="xs"
          component="span"
          color="hint"
          mt="4px"
          sx={{ display: "block", textAlign: "right" }}
        >
          <TokenPrice format="full" />
        </Typography>
      }
    />
  ) : null;
};

export default TokenDetailsPrice;
