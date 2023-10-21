import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useBackButton from "../../hooks/useBackButton";
import { TelegramUserActivity } from "../../types/Telegram";
import { BOT_API_URL } from "../../constants";
import axios from "axios";
import { selectAppStore, useAppSelector } from "../../store";
import Loading from "../shared/Loading";
import Activity from "../shared/Activity/Activity";

const ActivityPage = () => {
  useBackButton();
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
    if (item) {
      return;
    }
    axios
      .get(`${BOT_API_URL}/v2/activity/${id}`, {
        signal: controller.signal,
        headers: {
          Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
        },
      })

      .then((res) => {
        if (res?.data) {
          setItem(res.data || null);
        }
      })
      .catch((err) => {
        //
      });

    return () => {
      controller.abort();
    };
  }, [item, id]);

  return item ? <Activity activity={item} /> : <Loading />;
};

export default ActivityPage;
