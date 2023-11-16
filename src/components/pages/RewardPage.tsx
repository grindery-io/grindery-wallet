import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useBackButton from "../../hooks/useBackButton";
import { selectAppStore, useAppSelector } from "../../store";
import { TelegramUserReward } from "../../types/Telegram";
import Reward from "../shared/Reward/Reward";
import Loading from "../shared/Loading/Loading";
import { getSingleRewardRequest } from "../../services/rewards";

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
    if (item || !id) {
      return;
    }
    getSingleRewardRequest(id, controller)
      .then((res) => {
        setItem(res.data || null);
      })
      .catch(() => {
        navigate("/rewards");
      });

    return () => {
      controller.abort();
    };
  }, [item, id, navigate]);

  return item ? <Reward reward={item} /> : <Loading />;
};

export default RewardPage;
