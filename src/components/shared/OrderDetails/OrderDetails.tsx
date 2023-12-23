import React from "react";
import { selectAppStore, useAppSelector } from "store";
import { OrderStatus } from "types";
import OrderDetailsCompleted from "./OrderDetailsCompleted/OrderDetailsCompleted";
import OrderDetailsProgress from "./OrderDetailsProgress/OrderDetailsProgress";

const OrderDetails = () => {
  const {
    order: { status, input },
  } = useAppSelector(selectAppStore);

  const isOrderCompleted =
    (status === OrderStatus.SENT && (!input.add || input.add === "0")) ||
    status === OrderStatus.COMPLETED;

  return isOrderCompleted ? (
    <OrderDetailsCompleted />
  ) : (
    <OrderDetailsProgress />
  );
};

export default OrderDetails;
