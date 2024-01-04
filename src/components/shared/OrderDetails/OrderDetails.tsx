import React from "react";
import { selectAppStore, useAppSelector } from "store";
import OrderDetailsCompleted from "./OrderDetailsCompleted/OrderDetailsCompleted";
import OrderDetailsProgress from "./OrderDetailsProgress/OrderDetailsProgress";
import { OrderStatus } from "types";
import Order from "../Order/Order";
import Loading from "../Loading/Loading";

const OrderDetails = () => {
  const { order } = useAppSelector(selectAppStore);

  const isOrderCompleted = order?.status === OrderStatus.COMPLETE;

  return order ? (
    <Order order={order}>
      {isOrderCompleted ? <OrderDetailsCompleted /> : <OrderDetailsProgress />}
    </Order>
  ) : (
    <Loading />
  );
};

export default OrderDetails;
