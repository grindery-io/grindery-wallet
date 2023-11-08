import React, { useCallback, useEffect } from "react";
import { Box } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import BalanceValue from "./BalanceValue";
import BalanceUpdated from "./BalanceUpdated";
import { getBalanceRequest } from "../../../services/balance";
import { STORAGE_KEYS } from "../../../constants";

const Balance = () => {
  const dispatch = useAppDispatch();
  const { user, balance } = useAppSelector(selectAppStore);

  const getBalance = useCallback(async () => {
    if (!user?.patchwallet) {
      return;
    }
    if (!balance.shouldUpdate) {
      return;
    }
    // get balance here
    const userId = user.userTelegramID;
    try {
      const res = await getBalanceRequest(user.patchwallet);
      if (res?.data?.balanceEther) {
        const date = new Date().toString();
        dispatch(
          appStoreActions.setBalance({
            value: parseFloat(res.data.balanceEther),
            cached: false,
            loading: false,
            updated: date,
            shouldUpdate: false,
          })
        );
        localStorage.setItem(
          STORAGE_KEYS.BALANCE.replace("{{id}}", userId || ""),
          res.data.balanceEther
        );
        localStorage.setItem(
          STORAGE_KEYS.BALANCE_UPDATED.replace("{{id}}", userId || ""),
          date
        );
      } else {
        dispatch(
          appStoreActions.setBalance({
            value: 0,
            cached: false,
            loading: false,
            shouldUpdate: false,
          })
        );
        localStorage.setItem(
          STORAGE_KEYS.BALANCE.replace("{{id}}", userId || ""),
          "0"
        );
      }
    } catch (error) {
      dispatch(
        appStoreActions.setBalance({
          value: 0,
          cached: false,
          loading: false,
          shouldUpdate: false,
        })
      );
      localStorage.setItem(
        STORAGE_KEYS.BALANCE.replace("{{id}}", userId || ""),
        "0"
      );
    }
  }, [user, balance.shouldUpdate, dispatch]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  useEffect(() => {
    if (user?.userTelegramID && typeof balance.value === "undefined") {
      dispatch(
        appStoreActions.setBalance({
          value: parseFloat(
            localStorage.getItem(
              STORAGE_KEYS.BALANCE.replace("{{id}}", user?.userTelegramID || "")
            ) || "0"
          ),
          cached: true,
          updated:
            localStorage.getItem(
              STORAGE_KEYS.BALANCE_UPDATED.replace(
                "{{id}}",
                user?.userTelegramID || ""
              )
            ) || "",
        })
      );
    }
  }, [user, balance, dispatch]);

  return (
    <Box
      sx={{
        ...BalanceStyles,
        opacity: balance.cached ? 0.6 : 1,
      }}
    >
      <BalanceValue />
      {balance.updated && <BalanceUpdated />}
    </Box>
  );
};

const BalanceStyles = {
  width: "100%",
  padding: "16px 16px 12px",
  textAlign: "center",
  margin: "8px 0 0",
};

export default Balance;
