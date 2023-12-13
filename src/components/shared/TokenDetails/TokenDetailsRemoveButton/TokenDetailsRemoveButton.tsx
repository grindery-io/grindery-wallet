import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../../store";
import { TokenDetailsProps } from "../TokenDetails";
import { MAIN_TOKEN_ADDRESS, STORAGE_KEYS } from "../../../../constants";

const TokenDetailsRemoveButton = ({ token }: TokenDetailsProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { tokens } = useAppSelector(selectAppStore);

  return token.address.toLowerCase() !== MAIN_TOKEN_ADDRESS.toLowerCase() &&
    token.address.toLowerCase() !==
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" ? (
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
        const removedTokens = JSON.parse(
          localStorage.getItem(STORAGE_KEYS.REMOVED_TOKENS) || "[]"
        );
        localStorage.setItem(
          STORAGE_KEYS.REMOVED_TOKENS,
          JSON.stringify([...removedTokens, `${token.chain}:${token.address}`])
        );
        navigate("/tokens");
      }}
    >
      Remove token from wallet
    </Button>
  ) : null;
};

export default TokenDetailsRemoveButton;
