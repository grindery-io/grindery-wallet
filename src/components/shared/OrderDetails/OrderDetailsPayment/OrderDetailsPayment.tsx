import React, { useState } from "react";
import { Box, Button, ButtonBase, Stack, Typography } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";
import {
  Token,
  TokenBalance,
  TokenChain,
  TokenIcon,
  TokenSymbol,
  TokenType,
} from "components/shared/Token";
import DialogSelect from "components/shared/DialogSelect/DialogSelect";
import TokensListItem from "components/shared/TokensList/TokensListItem/TokensListItem";
import { getOrderStatus, payOrder } from "services";
import { OrderStatus } from "types";
import { useOrder } from "components/shared/Order/Order";

const getTokenRquiredAmount = (
  token: TokenType,
  requiredUsd: number
): number => {
  return requiredUsd / parseFloat(token.price || "0");
};

const OrderDetailsPayment = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const { tokens } = useAppSelector(selectAppStore);
  const order = useOrder();

  const usdTokens = tokens.filter((token) => {
    const tokenUsdValue =
      (parseFloat(token.balance) / 10 ** token.decimals) *
      parseFloat(token.price);

    return (
      token.chain === "137" &&
      token.price &&
      parseFloat(token.balance) > 0 &&
      tokenUsdValue > 0.1
    );
  });

  const [selectedToken, setSelectedToken] = useState(usdTokens[0]);

  const requiredUsd = parseFloat(order?.usdFromUsdInvestment || "0");

  const requiredUsdFormatted = parseFloat(
    requiredUsd.toFixed(2)
  ).toLocaleString();

  const selectedTokenRequiredAmount = getTokenRquiredAmount(
    selectedToken,
    requiredUsd
  );

  const selectedTokenRequiredAmountFormatted = parseFloat(
    getTokenRquiredAmount(selectedToken, requiredUsd).toFixed(2)
  ).toLocaleString();

  const selectedTokenBalance =
    parseFloat(selectedToken.balance) / 10 ** selectedToken.decimals;

  const isBalanceNotEnough = selectedTokenBalance < selectedTokenRequiredAmount;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const completeOrder = async () => {
    dispatch(
      appStoreActions.setOrder(
        order
          ? {
              ...order,
              status: OrderStatus.PENDING_USD,
            }
          : null
      )
    );

    try {
      const res = await payOrder({
        orderId: order?.orderId || "",
        tokenAddress: selectedToken.address,
        chainId: selectedToken.chain,
      });
      if (res.data?.success) {
        const status = await getOrderStatus(order?.orderId || "");
        dispatch(appStoreActions.setOrder(status.data || null));
      } else {
        dispatch(
          appStoreActions.setOrder(
            order
              ? {
                  ...order,
                  status: OrderStatus.FAILURE_USD,
                }
              : null
          )
        );
      }
    } catch (error) {
      dispatch(
        appStoreActions.setOrder(
          order
            ? {
                ...order,
                status: OrderStatus.FAILURE_USD,
              }
            : null
        )
      );
    }
  };

  const handleOrderCompleteClick = () => {
    const message = `You are paying outstanding balance of $${requiredUsdFormatted} USD with ${selectedToken.symbol} on Polygon.\n\nThe deposit is not refundable.\nWould you like to proceed?`;

    if (window.Telegram?.WebApp?.showConfirm) {
      window.Telegram?.WebApp?.showConfirm(message, (confirmed: boolean) => {
        if (confirmed) {
          completeOrder();
        }
      });
    } else {
      const confirmed = window.confirm(message);
      if (confirmed) {
        completeOrder();
      }
    }
  };

  return (
    <>
      <Stack
        direction="column"
        alignItems="stretch"
        justifyContent="flex-start"
        flexWrap="nowrap"
        spacing="16px"
        p="16px"
        width="calc(100% - 32px)"
        m="0 16px"
        useFlexGap
      >
        <Typography variant="lg" textAlign="center" fontWeight="bold">
          Pay Now
        </Typography>
        <Token token={selectedToken}>
          <Stack
            direction="column"
            alignItems="stretch"
            justifyContent="flex-start"
            flexWrap="nowrap"
            spacing="8px"
            width="100%"
            useFlexGap
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="nowrap"
              spacing="8px"
              width="100%"
              useFlexGap
            >
              <ButtonBase
                disabled={order?.status === OrderStatus.PENDING_USD}
                onClick={handleOpen}
                sx={{
                  padding: "6px 8px",
                  backgroundColor:
                    "var(--tg-theme-secondary-bg-color, #efeff3)",
                  borderRadius: "6px",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  flexWrap="nowrap"
                  spacing="4px"
                  useFlexGap
                >
                  <TokenIcon size={16} />
                  <Typography>
                    <Typography component="span">
                      <TokenSymbol />
                    </Typography>{" "}
                    <Typography component="span" color="hint">
                      on <TokenChain />
                    </Typography>
                  </Typography>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="11"
                    viewBox="0 0 10 11"
                    fill="none"
                    style={{ color: "var(--tg-theme-hint-color, #999999)" }}
                  >
                    <path
                      d="M1.1543 3.5769L5.00045 7.42306L8.8466 3.5769"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </Stack>
              </ButtonBase>
              <Typography variant="title" color="hint" fontWeight="300">
                ~{selectedTokenRequiredAmountFormatted}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="nowrap"
              spacing="8px"
              width="100%"
              useFlexGap
            >
              <Typography color="hint" variant="xs">
                You have: <TokenBalance format="eth" /> <TokenSymbol />
              </Typography>
              <Typography textAlign="right" color="hint" variant="xs">
                *$
                <span>{requiredUsdFormatted}</span> USD
              </Typography>
            </Stack>
          </Stack>
        </Token>
        <Stack
          direction="column"
          alignItems="stretch"
          justifyContent="flex-start"
          flexWrap="nowrap"
          spacing="8px"
          width="100%"
          useFlexGap
        >
          <Button
            disabled={
              isBalanceNotEnough || order?.status === OrderStatus.PENDING_USD
            }
            color="secondary"
            variant="contained"
            fullWidth
            size="large"
            sx={{ paddingTop: "10px", paddingBottom: "10px" }}
            onClick={handleOrderCompleteClick}
          >
            {isBalanceNotEnough
              ? "Balance too low"
              : order?.status === OrderStatus.PENDING_USD
              ? "Processing"
              : "Complete order now"}
          </Button>
          {isBalanceNotEnough ? (
            <Typography
              variant="sm"
              fontWeight="300"
              textAlign="center"
              color="error"
              sx={{
                "& a": {
                  color: "error.main",
                  textDecoration: "none",
                  "&:hover": {
                    color: "error.main",
                    textDecoration: "underline",
                  },
                },
              }}
            >
              Consider depositing or swapping.{" "}
              <a href="https://grindery.io" target="_blank" rel="noreferrer">
                Learn how
              </a>
              .
            </Typography>
          ) : (
            <Typography variant="sm" fontWeight="300" textAlign="center">
              This will complete your order and guarantee your allocation.
            </Typography>
          )}
        </Stack>
      </Stack>
      <DialogSelect
        open={open}
        onClose={handleClose}
        search={{
          value: search,
          onChange: setSearch,
        }}
        items={usdTokens.filter((token) =>
          token.symbol.toLowerCase().includes(search.toLowerCase())
        )}
        itemSize={48}
        item={(itemProps: { data: any; index: number; style: any }) => (
          <Box
            sx={{ ...itemProps.style, padding: "0 8px" }}
            key={itemProps.data[itemProps.index].id}
          >
            <TokensListItem
              withChainIcon
              key={itemProps.data[itemProps.index].address}
              passive
              token={itemProps.data[itemProps.index]}
              onClick={() => {
                setSelectedToken(itemProps.data[itemProps.index]);
                handleClose();
              }}
            />
          </Box>
        )}
      />
    </>
  );
};

export default OrderDetailsPayment;
