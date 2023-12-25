import React from "react";
import OrderDetailsPayment from "../../OrderDetailsPayment/OrderDetailsPayment";
import OrderDetailsPaymentProgress from "../../OrderDetailsPaymentProgress/OrderDetailsPaymentProgress";

const OrderDetailsProgressStatus = () => {
  return (
    <>
      <OrderDetailsPaymentProgress />
      <OrderDetailsPayment />
    </>
  );
};

export default OrderDetailsProgressStatus;
