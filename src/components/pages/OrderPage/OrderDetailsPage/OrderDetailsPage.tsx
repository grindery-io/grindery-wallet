import React, { useEffect } from "react";
import Loading from "components/shared/Loading/Loading";
import { selectAppStore, useAppSelector } from "store";
import OrderDetails from "components/shared/OrderDetails/OrderDetails";

const OrderDetailsPage = () => {
  const {
    user,
    order: { details },
  } = useAppSelector(selectAppStore);

  useEffect(() => {
    if (window.Telegram?.WebApp.BackButton) {
      window.Telegram?.WebApp.BackButton.hide();
    }
  }, []);

  return user?.patchwallet && details?.orderId ? <OrderDetails /> : <Loading />;
};

export default OrderDetailsPage;
