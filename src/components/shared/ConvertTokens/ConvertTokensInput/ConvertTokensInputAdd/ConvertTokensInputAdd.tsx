import React from "react";
import { Box, InputBase, Stack, Tooltip, Typography } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";
import InfoIcon from "components/icons/InfoIcon";

type ConvertTokensInputAddProps = {};

const ConvertTokensInputAdd = (props: ConvertTokensInputAddProps) => {
  const dispatch = useAppDispatch();
  const {
    convert: { input },
  } = useAppSelector(selectAppStore);
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing="16px"
      sx={{ padding: "16px 16px 12px", "& *": { lineHeight: "1.2" } }}
    >
      <Box>
        <Typography color="hint" mb="2px">
          <strong>You add</strong>
        </Typography>
        <InputBase
          placeholder="0.00"
          sx={{ marginBottom: "2px" }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
              appStoreActions.setConvert({
                input: {
                  ...input,
                  add: event.target.value,
                },
              })
            );
          }}
          inputProps={{
            sx: {
              padding: 0,
              background: "transparent",
              color: "var(--tg-theme-text-color, #000000)",
              fontSize: "24px",
              lineHeight: "1",
              fontWeight: "600",
            },
          }}
        />
        <Typography variant="xs" color="hint">
          UST, USDC, MATIC, ...{" "}
          <Tooltip title="Some text">
            <span>
              <InfoIcon
                sx={{ marginLeft: "2px", transform: "translateY(1.5px)" }}
              />
            </span>
          </Tooltip>
        </Typography>
      </Box>

      <Box textAlign="right">
        <Typography mt="4px">
          <strong>USD</strong>
        </Typography>
      </Box>
    </Stack>
  );
};

export default ConvertTokensInputAdd;
