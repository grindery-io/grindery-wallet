import React, { useEffect, useState } from "react";
import useBackButton from "../../hooks/useBackButton";
import { useSearchParams } from "react-router-dom";
import { appStoreActions, useAppDispatch } from "../../store";
import SendTokens from "../shared/SendTokens/SendTokens";
import { SendStatus } from "../../types/State";
import Loading from "../shared/Loading/Loading";

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
