import React, { useEffect } from "react";
import Loading from "components/shared/Loading/Loading";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";
import { OrderStatus } from "types";
import OrderDetails from "components/shared/OrderDetails/OrderDetails";
import useBackButton from "hooks/useBackButton";

const OrderDetailsPage = () => {
  useBackButton();
  const dispatch = useAppDispatch();
  const {
    user,
    order: { status },
  } = useAppSelector(selectAppStore);
  useEffect(() => {
    // TODO: Get order status from server
    setTimeout(() => {
      dispatch(
        appStoreActions.setOrder({
          status: OrderStatus.SENT,
        })
      );
    }, 1500);
  }, [dispatch]);

  return user?.patchwallet &&
    (status === OrderStatus.SENT || status === OrderStatus.COMPLETED) ? (
    <OrderDetails />
  ) : (
    <Loading />
  );
};

export default OrderDetailsPage;
