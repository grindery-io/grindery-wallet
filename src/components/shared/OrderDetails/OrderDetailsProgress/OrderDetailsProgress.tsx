import React, { useState } from "react";
import OrderDetailsTabs from "../OrderDetailsTabs/OrderDetailsTabs";
import OrderDetailsPayLater from "../OrderDetailsPayLater/OrderDetailsPayLater";
import OrderDetailsProgressStatus from "./OrderDetailsProgressStatus/OrderDetailsProgressStatus";
import OrderDetailsProgressDetails from "./OrderDetailsProgressDetails/OrderDetailsProgressDetails";

type Props = {};

const OrderDetailsProgress = (props: Props) => {
  const [tab, setTab] = useState(0);
  const handleTabChange = (tab: number) => {
    setTab(tab);
  };

  return (
    <>
      <OrderDetailsTabs tab={tab} onChange={handleTabChange} />
      {tab === 0 && <OrderDetailsProgressStatus />}
      {tab === 1 && <OrderDetailsProgressDetails />}
      <OrderDetailsPayLater />
    </>
  );
};

export default OrderDetailsProgress;
