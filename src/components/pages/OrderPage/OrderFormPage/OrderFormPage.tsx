import React, { useEffect } from "react";
import useBackButton from "hooks/useBackButton";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";
import Loading from "components/shared/Loading/Loading";
import OrderTokens from "components/shared/OrderTokens/OrderTokens";
import { OrderStatus } from "types";

const OrderFormPage = () => {
  useBackButton();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAppStore);

  useEffect(() => {
    dispatch(
      appStoreActions.setOrder({
        input: {
          convert: "",
          add: "",
        },
        quote: null,
        status: OrderStatus.WAITING,
      })
    );
  }, [dispatch]);

  return user?.patchwallet ? <OrderTokens /> : <Loading />;
};

export default OrderFormPage;
