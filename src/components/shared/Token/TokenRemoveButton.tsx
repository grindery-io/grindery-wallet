import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { TokenProps } from "./Token";

const TokenRemoveButton = ({ token }: TokenProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    tokens: { items },
  } = useAppSelector(selectAppStore);

  return (
    <Button
      sx={{ marginTop: "24px" }}
      fullWidth
      color="error"
      variant="outlined"
      onClick={() => {
        dispatch(
          appStoreActions.setTokens({
            items: [...items.filter((item) => item.address !== token.address)],
          })
        );
        setTimeout(() => {
          navigate("/tokens");
        }, 150);
      }}
    >
      Remove token from wallet
    </Button>
  );
};

export default TokenRemoveButton;
