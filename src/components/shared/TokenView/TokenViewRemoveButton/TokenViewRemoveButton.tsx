import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../../store";
import { TokenViewProps } from "../TokenView";

const TokenViewRemoveButton = ({ token }: TokenViewProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { tokens } = useAppSelector(selectAppStore);

  return parseFloat(token.balance) <= 0 ? (
    <Button
      sx={{ marginTop: "24px" }}
      fullWidth
      color="error"
      variant="outlined"
      onClick={() => {
        dispatch(
          appStoreActions.setTokens([
            ...tokens.filter((item) => item.address !== token.address),
          ])
        );
        navigate("/tokens");
      }}
    >
      Remove token from wallet
    </Button>
  ) : null;
};

export default TokenViewRemoveButton;
