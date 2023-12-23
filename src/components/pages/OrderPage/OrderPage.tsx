import React from "react";
import { Route, Routes } from "react-router";
import OrderIntroPage from "./OrderIntroPage/OrderIntroPage";
import OrderFormPage from "./OrderFormPage/OrderFormPage";
import OrderDetailsPage from "./OrderDetailsPage/OrderDetailsPage";

const OrderPage = () => {
  return (
    <Routes>
      <Route path="/" element={<OrderIntroPage />} />
      <Route path="/form" element={<OrderFormPage />} />
      <Route path="/:orderId" element={<OrderDetailsPage />} />
    </Routes>
  );
};

export default OrderPage;
