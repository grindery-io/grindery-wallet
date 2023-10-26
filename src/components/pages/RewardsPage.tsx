import React, { useCallback, useEffect } from "react";
import BottomNavigation from "../shared/BottomNavigation";
import ReferralBanner from "../shared/ReferralBanner";
import RewardsList from "../shared/RewardsList/RewardsList";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { getRewardsRequest } from "../../services/rewards";
import { STORAGE_KEYS } from "../../constants";

const RewardsPage = () => {
  const dispatch = useAppDispatch();
  const {
    rewards: { find, filter },
  } = useAppSelector(selectAppStore);

  const getTgRewards = useCallback(async () => {
    if (!window.Telegram?.WebApp?.initData) {
      return;
    }
    dispatch(
      appStoreActions.setRewards({
        loading: true,
      })
    );
    try {
      const res = await getRewardsRequest(filter, find);
      dispatch(
        appStoreActions.setRewards({
          docs: res.data?.docs || [],
          total: res.data?.total || 0,
        })
      );
      if (!filter || filter === "pending") {
        localStorage.setItem(
          STORAGE_KEYS.REWARDS,
          JSON.stringify(res.data?.docs)
        );
        localStorage.setItem(STORAGE_KEYS.REWARDS_SAVED, new Date().toString());
      }
    } catch (error) {
      console.error("getTgRewards error", error);
    }
    dispatch(
      appStoreActions.setRewards({
        loading: false,
      })
    );
  }, [find, filter, dispatch]);

  useEffect(() => {
    getTgRewards();
  }, [getTgRewards]);

  return (
    <>
      <RewardsList />
      <ReferralBanner />
      <BottomNavigation />
    </>
  );
};

export default RewardsPage;
