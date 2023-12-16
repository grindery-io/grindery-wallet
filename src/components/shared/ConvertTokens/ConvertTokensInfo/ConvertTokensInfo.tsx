import React from "react";
import { Box, Stack, Typography } from "@mui/material";

type ConvertTokensInfoProps = {};

const ConvertTokensInfo = (props: ConvertTokensInfoProps) => {
  return (
    <Stack
      direction="column"
      alignItems="stretch"
      justifyContent="flex-start"
      flexWrap="nowrap"
      useFlexGap
      spacing="8px"
      sx={{
        margin: "16px 16px 0",
        width: "calc(100% - 32px)",
        "& *": {
          lineHeight: "1.2",
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing="8px"
        width="100%"
      >
        <Typography color="hint" textAlign="left">
          <strong>MVU Score</strong>
        </Typography>
        <Typography variant="xs" color="hint" textAlign="right">
          7.8 / 10
        </Typography>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing="8px"
        width="100%"
      >
        <Typography color="hint" textAlign="left">
          <strong>Position</strong>
        </Typography>
        <Typography variant="xs" color="hint" textAlign="right">
          326
        </Typography>
      </Stack>
      <Box>
        <Typography variant="xs" color="hint" textAlign="left">
          <em>Score and position influence your G1/GX exchange rate.</em>
        </Typography>
      </Box>
    </Stack>
  );
};

export default ConvertTokensInfo;
