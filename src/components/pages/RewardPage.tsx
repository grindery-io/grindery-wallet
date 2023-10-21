import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useBackButton from "../../hooks/useBackButton";
import { selectAppStore, useAppSelector } from "../../store";
import { TelegramUserReward } from "../../types/Telegram";
import Reward from "../shared/Reward/Reward";
import Loading from "../shared/Loading";
import axios from "axios";
import { BOT_API_URL } from "../../constants";

const RewardPage = () => {
  useBackButton();
  const navigate = useNavigate();
  const {
    rewards: { docs },
  } = useAppSelector(selectAppStore);
  const { id } = useParams();

  const [item, setItem] = useState<TelegramUserReward | null>(
    (docs as TelegramUserReward[]).find(
      (item: TelegramUserReward) => id && item._id && item._id === id
    ) || null
  );

  useEffect(() => {
    const controller = new AbortController();
    if (item) {
      return;
    }
    axios
      .get(`${BOT_API_URL}/v2/rewards/${id}`, {
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
        navigate("/rewards");
      });

    return () => {
      controller.abort();
    };
  }, [item, id, navigate]);

  return item ? <Reward reward={item} /> : <Loading />;
};

export default RewardPage;
