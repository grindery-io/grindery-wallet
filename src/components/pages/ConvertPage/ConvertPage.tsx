import React, { useEffect, useState } from "react";
import { ConvertStatus } from "types";
import useBackButton from "hooks/useBackButton";
import { appStoreActions, useAppDispatch } from "store";
import Loading from "components/shared/Loading/Loading";
import ConvertTokens from "components/shared/ConvertTokens/ConvertTokens";

const ConvertPage = () => {
  useBackButton();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(
      appStoreActions.setConvert({
        input: {
          tokenIn: "",
          amountIn: "",
          tokenOut: "",
          chainIn: "",
          chainOut: "",
        },
        status: ConvertStatus.WAITING,
      })
    );
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [dispatch]);

  return !loading ? <ConvertTokens /> : <Loading />;
};

export default ConvertPage;
