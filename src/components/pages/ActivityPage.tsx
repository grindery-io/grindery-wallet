import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useBackButton from "../../hooks/useBackButton";
import { TelegramUserActivity } from "../../types/Telegram";
import { selectAppStore, useAppSelector } from "../../store";
import Loading from "../shared/Loading/Loading";
import Activity from "../shared/Activity/Activity";
import { getSingleActivityRequest } from "../../services/activity";

const ActivityPage = () => {
  useBackButton();
  const navigate = useNavigate();
  const {
    activity: { items },
  } = useAppSelector(selectAppStore);

  const { id } = useParams();

  const [item, setItem] = useState<TelegramUserActivity | null>(
    items.find(
      (item) =>
        item?._id === id || item?.transactionHash === id || item?.TxId === id
    ) || null
  );

  useEffect(() => {
    const controller = new AbortController();
    if (item || !id) {
      return;
    }
    getSingleActivityRequest(id, controller)
      .then((res) => {
        if (res?.data) {
          setItem(res.data || null);
        }
      })
      .catch((err) => {
        navigate("/tokens");
      });

    return () => {
      controller.abort();
    };
  }, [item, id, navigate]);

  return item ? <Activity activity={item} /> : <Loading />;
};

export default ActivityPage;
