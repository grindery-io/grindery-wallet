import React, { useEffect } from "react";
import Loading from "components/shared/Loading/Loading";
import { selectAppStore, useAppSelector } from "store";
import OrderDetails from "components/shared/OrderDetails/OrderDetails";
import { Navigate, useNavigate, useParams } from "react-router";

const OrderDetailsPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const {
    user,
    order: { details },
  } = useAppSelector(selectAppStore);

  useEffect(() => {
    if (window.Telegram?.WebApp.BackButton) {
      window.Telegram?.WebApp.BackButton.hide();
    }
  }, []);

  useEffect(() => {
    if (typeof details !== "undefined" && !details) {
      navigate("/");
    }
  }, [details, navigate]);

  return user?.patchwallet && details?.orderId ? (
    details?.orderId !== orderId ? (
      <Navigate to="/" />
    ) : (
      <OrderDetails />
    )
  ) : typeof details !== "undefined" && !details ? (
    <Navigate to="/order" />
  ) : (
    <Loading />
  );
};

export default OrderDetailsPage;
