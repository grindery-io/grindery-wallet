import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useBackButton from "hooks/useBackButton";
import { appStoreActions, useAppDispatch } from "store";
import { SendStatus } from "types";
import SendTokens from "components/shared/SendTokens/SendTokens";
import Loading from "components/shared/Loading/Loading";
import { MAIN_TOKEN_ADDRESS } from "../../constants";

const SendPage = () => {
  useBackButton();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const recipientId = searchParams.get("id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(
      appStoreActions.setSend({
        input: {
          recipient: recipientId || null,
          amount: "",
          message: "",
          chainId: "137",
          tokenAddress: MAIN_TOKEN_ADDRESS,
        },
        status: SendStatus.WAITING,
        selectedContacts: [],
      })
    );
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [recipientId, dispatch]);

  return !loading ? <SendTokens /> : <Loading />;
};

export default SendPage;
