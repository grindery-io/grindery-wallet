import React, { useEffect, useState } from "react";
import useBackButton from "hooks/useBackButton";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";
import Loading from "components/shared/Loading/Loading";
import OrderTokens from "components/shared/OrderTokens/OrderTokens";
import { TGEStatus } from "types";

const TGEFormPage = () => {
  useBackButton();
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAppStore);

  useEffect(() => {
    dispatch(
      appStoreActions.setTGE({
        input: {
          g1Quantity: "",
          usdQuantity: "",
        },
        quote: null,
        status: TGEStatus.WAITING,
      })
    );
    setLoading(false);
  }, [dispatch]);

  return user?.patchwallet && !loading ? <OrderTokens /> : <Loading />;
};

export default TGEFormPage;
