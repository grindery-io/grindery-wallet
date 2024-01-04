import React, { useEffect } from "react";
import Loading from "components/shared/Loading/Loading";
import { selectAppStore, useAppSelector } from "store";
import OrderDetails from "components/shared/OrderDetails/OrderDetails";
import { Navigate, useNavigate } from "react-router";

const OrderDetailsPage = () => {
  const navigate = useNavigate();
  const { user, order } = useAppSelector(selectAppStore);

  useEffect(() => {
    if (window.Telegram?.WebApp.BackButton) {
      window.Telegram?.WebApp.BackButton.hide();
    }
  }, []);

  useEffect(() => {
    if (typeof order !== "undefined" && !order) {
      navigate("/", { replace: true });
    }
  }, [order, navigate]);

  return user?.patchwallet && order?.orderId ? (
    <OrderDetails />
  ) : typeof order !== "undefined" && !order ? (
    <Navigate to="/order" replace />
  ) : (
    <Loading />
  );
};

export default OrderDetailsPage;
