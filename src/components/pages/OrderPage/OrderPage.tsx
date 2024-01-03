import React from "react";
import { Navigate, Route, Routes } from "react-router";
import OrderIntroPage from "./OrderIntroPage/OrderIntroPage";
import OrderFormPage from "./OrderFormPage/OrderFormPage";
import OrderDetailsPage from "./OrderDetailsPage/OrderDetailsPage";
import { selectAppStore, useAppSelector } from "store";
import Loading from "components/shared/Loading/Loading";

const OrderPage = () => {
  const {
    order: { details },
  } = useAppSelector(selectAppStore);
  return typeof details !== "undefined" ? (
    <Routes>
      {!details && (
        <>
          <Route path="/" element={<OrderIntroPage />} />
          <Route path="/form" element={<OrderFormPage />} />
        </>
      )}
      <Route path="/:orderId" element={<OrderDetailsPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  ) : (
    <Loading />
  );
};

export default OrderPage;
