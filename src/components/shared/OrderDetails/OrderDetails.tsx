import React from "react";
import { selectAppStore, useAppSelector } from "store";
import OrderDetailsCompleted from "./OrderDetailsCompleted/OrderDetailsCompleted";
import OrderDetailsProgress from "./OrderDetailsProgress/OrderDetailsProgress";
import { OrderStatusType } from "services";

const OrderDetails = () => {
  const {
    order: { details },
  } = useAppSelector(selectAppStore);

  const isOrderCompleted = details?.status === OrderStatusType.COMPLETE;

  return isOrderCompleted ? (
    <OrderDetailsCompleted />
  ) : (
    <OrderDetailsProgress />
  );
};

export default OrderDetails;
