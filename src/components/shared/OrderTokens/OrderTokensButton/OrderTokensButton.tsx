import React, { useEffect } from "react";
import moment from "moment";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";
import { OrderDetailsStatus, OrderStatus } from "types";
import { useNavigate } from "react-router";
import { GRINDERY_ONE_TOKEN, MAIN_TOKEN_ADDRESS } from "../../../../constants";
import { TokenType } from "components/shared/Token";
import { getOrderStatus, sendOrder } from "services";

const REFRESH_TIMEOUT = 600;

const OrderTokensButton = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = React.useState(0);
  const dispatch = useAppDispatch();
  const {
    tokens,
    order: { input, status, quote },
  } = useAppSelector(selectAppStore);
  const gxAmount = quote?.gx_received || "0";
  const grinderyToken =
    tokens.find(
      (token) =>
        token.address.toLowerCase() === MAIN_TOKEN_ADDRESS.toLowerCase()
    ) || (GRINDERY_ONE_TOKEN as TokenType);
  const notEnoughG1 =
    parseFloat(input.convert || "0") >
    parseFloat(grinderyToken.balance || "0") / 10 ** grinderyToken.decimals;
  const disabled =
    status === OrderStatus.LOADING ||
    parseFloat(gxAmount) <= 0 ||
    notEnoughG1 ||
    !quote?.quoteId;

  const duration = moment.duration(REFRESH_TIMEOUT - timer, "seconds");

  const timerString = `${duration.hours() < 10 ? "0" : ""}${duration.hours()}:${
    duration.minutes() < 10 ? "0" : ""
  }${duration.minutes()}:${
    duration.seconds() < 10 ? "0" : ""
  }${duration.seconds()}`;

  const orderTokens = async () => {
    // TODO: send order to server
    dispatch(
      appStoreActions.setOrder({
        status: OrderStatus.SENDING,
      })
    );
    try {
      const res = await sendOrder(quote?.quoteId || "");
      if (res.data?.success) {
        const status = await getOrderStatus();
        dispatch(
          appStoreActions.setOrder({
            status:
              status.data?.status === OrderDetailsStatus.COMPLETE
                ? OrderStatus.COMPLETED
                : status.data?.status === OrderDetailsStatus.PENDING
                ? OrderStatus.SENDING
                : OrderStatus.WAITING_USD_PAYMENT,
            details: status.data || null,
          })
        );
        navigate(`/order/${status.data?.orderId}`);
      } else {
        dispatch(
          appStoreActions.setOrder({
            status: OrderStatus.ERROR,
          })
        );
      }
    } catch (err) {
      console.log(err);
      dispatch(
        appStoreActions.setOrder({
          status: OrderStatus.ERROR,
        })
      );
    }
  };

  const handleClick = () => {
    if (timer >= REFRESH_TIMEOUT) {
      dispatch(
        appStoreActions.setOrder({
          status: OrderStatus.LOADING,
        })
      );
      setTimeout(() => {
        dispatch(
          appStoreActions.setOrder({
            status: OrderStatus.WAITING,
          })
        );
      }, 1500);
      setTimer(0);
      return;
    }
    const message = `You are exchanging\n${input.convert} G1 for ${gxAmount} GX.\n\nThe deposit is not refundable.\nWould you like to proceed?`;

    if (window.Telegram?.WebApp?.showConfirm) {
      window.Telegram?.WebApp?.showConfirm(message, (confirmed: boolean) => {
        if (confirmed) {
          orderTokens();
        }
      });
    } else {
      const confirmed = window.confirm(message);
      if (confirmed) {
        orderTokens();
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
        {notEnoughG1
          ? "Not enough G1"
          : disabled
          ? "Order Now"
          : timer < REFRESH_TIMEOUT
          ? "Order Now"
          : "Refresh"}
      </Button>
      <Box
        sx={{
          opacity: !disabled && quote ? 1 : 0,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing="4px"
          useFlexGap
          mt="16px"
        >
          <Typography color="hint" variant="xs">
            We are holding your price
          </Typography>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.75 6.5C0.75 3.32436 3.32436 0.75 6.5 0.75C9.67564 0.75 12.25 3.32436 12.25 6.5C12.25 9.67564 9.67564 12.25 6.5 12.25C3.32436 12.25 0.75 9.67564 0.75 6.5ZM6.5 1.75C3.87665 1.75 1.75 3.87665 1.75 6.5C1.75 9.12335 3.87665 11.25 6.5 11.25C9.12335 11.25 11.25 9.12335 11.25 6.5C11.25 3.87665 9.12335 1.75 6.5 1.75Z"
              fill="#EA5230"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 4.125C6.77614 4.125 7 4.34886 7 4.625V6.5C7 6.77614 6.77614 7 6.5 7C6.22386 7 6 6.77614 6 6.5V4.625C6 4.34886 6.22386 4.125 6.5 4.125Z"
              fill="#EA5230"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.14648 6.14641C6.34177 5.95117 6.65835 5.9512 6.85359 6.14648L9.19709 8.49048C9.39233 8.68577 9.3923 9.00235 9.19702 9.19759C9.00173 9.39283 8.68515 9.3928 8.48991 9.19752L6.14641 6.85352C5.95117 6.65823 5.9512 6.34165 6.14648 6.14641Z"
              fill="#EA5230"
            />
          </svg>
          <Typography
            sx={{
              color: "var(--gr-theme-color-secondary, #ea5230)",
              minWidth: "56px",
            }}
            variant="xs"
          >
            {timerString}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default OrderTokensButton;
