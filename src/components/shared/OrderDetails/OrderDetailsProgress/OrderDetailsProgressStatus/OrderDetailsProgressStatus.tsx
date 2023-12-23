import React from "react";
import { Button, Typography } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";
import { OrderStatus } from "types";

const OrderDetailsProgressStatus = () => {
  const dispatch = useAppDispatch();
  const {
    order: {
      input: { add },
    },
  } = useAppSelector(selectAppStore);
  return (
    <>
      <Typography variant="lg" textAlign="center">
        <strong>Progress Steps</strong>
      </Typography>

      <Typography variant="lg" textAlign="center">
        <strong>Pay Now</strong>
      </Typography>
      <Button
        color="secondary"
        variant="outlined"
        size="small"
        onClick={() => {
          dispatch(
            appStoreActions.setOrder({
              status: OrderStatus.PAYING,
            })
          );

          const message = `You are paying outstanding balance of $${parseFloat(
            add
          ).toFixed(
            2
          )} USD with MATIC on Polygon.\n\nThe deposit is not refundable.\nWould you like to proceed?`;

          if (window.Telegram?.WebApp?.showConfirm) {
            window.Telegram?.WebApp?.showConfirm(
              message,
              (confirmed: boolean) => {
                if (confirmed) {
                  dispatch(
                    appStoreActions.setOrder({
                      status: OrderStatus.COMPLETED,
                    })
                  );
                }
              }
            );
          } else {
            const confirmed = window.confirm(message);
            if (confirmed) {
              dispatch(
                appStoreActions.setOrder({
                  status: OrderStatus.COMPLETED,
                })
              );
            }
          }
        }}
      >
        Simulate payment
      </Button>
    </>
  );
};

export default OrderDetailsProgressStatus;
