import React, { useEffect } from "react";
import moment from "moment";
import { Box, Button } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";
import { ConvertStatus } from "types";

const refreshTimeout = 600;

type ConvertTokensButtonProps = {};

const ConvertTokensButton = (props: ConvertTokensButtonProps) => {
  const [timer, setTimer] = React.useState(0);
  const dispatch = useAppDispatch();
  const {
    convert: { input, status, result },
  } = useAppSelector(selectAppStore);
  const disabled =
    status === ConvertStatus.LOADING ||
    parseFloat(input.convert || "0") <= 0 ||
    parseFloat(result || "0") <= 0;

  const gxPrice = "0.036";
  const gxPriceTotal = (
    parseFloat(result || "0") * parseFloat(gxPrice)
  ).toFixed(2);

  const duration = moment.duration(refreshTimeout - timer, "seconds");

  const convertTokens = () => {
    dispatch(
      appStoreActions.setConvert({
        status: ConvertStatus.SENDING,
      })
    );
    // TODO: place real order on server
    setTimeout(() => {
      dispatch(
        appStoreActions.setConvert({
          status: ConvertStatus.SENT,
        })
      );
    }, 1500);
  };

  const handleClick = () => {
    if (timer >= refreshTimeout) {
      dispatch(
        appStoreActions.setConvert({
          status: ConvertStatus.LOADING,
        })
      );
      setTimeout(() => {
        dispatch(
          appStoreActions.setConvert({
            status: ConvertStatus.WAITING,
          })
        );
      }, 1500);
      setTimer(0);
      return;
    }
    const message = `Confirm your pre-order.\n\nYou are reserving ${result} GX of a value of ${gxPriceTotal} USD with a non-refundable exchange of ${
      input.convert
    } G1${
      parseFloat(input.add) > 0
        ? ` now and a payment of ${input.add} USD in any supported token before 21.12.2023`
        : ""
    }.`;

    if (window.Telegram?.WebApp?.showConfirm) {
      window.Telegram?.WebApp?.showConfirm(message, (confirmed: boolean) => {
        if (confirmed) {
          convertTokens();
        }
      });
    } else {
      const confirmed = window.confirm(message);
      if (confirmed) {
        convertTokens();
      }
    }
  };

  useEffect(() => {
    let timerId: any;

    timerId = setInterval(() => {
      setTimer((_timer) => _timer + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (!disabled) {
      setTimer(0);
    }
  }, [disabled]);

  return (
    <Box sx={{ margin: "auto 16px 24px" }}>
      <Button
        disabled={disabled}
        variant="contained"
        fullWidth
        onClick={handleClick}
        color="secondary"
        size="large"
      >
        {disabled ? (
          "Pre-order"
        ) : timer < refreshTimeout ? (
          <>
            Pre-order (
            {refreshTimeout - timer > 60
              ? `${duration.minutes()}:${
                  duration.seconds() < 10 ? "0" : ""
                }${duration.seconds()}`
              : `${duration.asSeconds()}s`}
            )
          </>
        ) : (
          <>Refresh</>
        )}
      </Button>
    </Box>
  );
};

export default ConvertTokensButton;
