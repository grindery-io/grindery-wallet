import React from "react";
import { Stack, Typography } from "@mui/material";
import ArrowDownIcon from "components/icons/ArrowDownIcon";
import GXIcon from "components/icons/GXIcon";
import { selectAppStore, useAppSelector } from "store";

const ConvertTokensOutput = () => {
  const {
    convert: { result },
  } = useAppSelector(selectAppStore);
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      sx={{ margin: "16px" }}
    >
      <ArrowDownIcon />
      <Typography color="hint" mb="8px">
        <strong>You get</strong>
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing="8px"
      >
        <Typography variant="title">
          <strong>{result || "0"}</strong>
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing="4px"
        >
          <GXIcon />
          <Typography>
            <strong>GX</strong>
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="xs" color="hint" mt="6px">
        USD 102
      </Typography>
    </Stack>
  );
};

export default ConvertTokensOutput;
