import React from "react";
import TableRow from "../../TableRow";
import { TokenProps } from "../Token";
import { selectAppStore, useAppSelector } from "../../../../store";
import moment from "moment";
import { Box, Button, Typography } from "@mui/material";

// https://t.me/CoinMarketCap

const TokenDetailsPrice = ({ token }: TokenProps) => {
  const {
    debug: { features },
  } = useAppSelector(selectAppStore);

  return features?.TOKEN_PRICE ? (
    <TableRow
      label="Price"
      sx={{ alignItems: "flex-start" }}
      value={
        <Box textAlign="right">
          {`${token.price || 0} USD`}
          {token.priceUpdated && (
            <Typography
              variant="xs"
              component="span"
              color="hint"
              mt="4px"
              sx={{ display: "block", textAlign: "right" }}
            >
              Updated {moment(token.priceUpdated).fromNow()}
            </Typography>
          )}
          <Typography
            variant="xs"
            component="span"
            color="hint"
            mt="4px"
            sx={{ display: "block", textAlign: "right" }}
          >
            Data provided by{" "}
            <Button
              sx={{ padding: 0 }}
              variant="text"
              color="primary"
              size="small"
              onClick={() => {
                const url = "https://t.me/CoinMarketCap";
                if (
                  typeof window.Telegram?.WebApp?.openTelegramLink !==
                  "undefined"
                ) {
                  window.Telegram?.WebApp?.openTelegramLink(url);
                } else {
                  window.open(url, "_blank");
                }
              }}
            >
              @CoinMarketCap
            </Button>
          </Typography>
        </Box>
      }
    />
  ) : null;
};

export default TokenDetailsPrice;
