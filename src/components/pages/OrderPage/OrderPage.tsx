import React from "react";
import { Route, Routes } from "react-router";
import OrderIntroPage from "./OrderIntroPage/OrderIntroPage";
import OrderFormPage from "./OrderFormPage/OrderFormPage";

type Props = {};

const OrderPage = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<OrderIntroPage />} />
      <Route path="/form" element={<OrderFormPage />} />
      <Route path="/:id" element={<div>order details</div>} />
    </Routes>
  );
};

export default OrderPage;
