import React, { useCallback, useEffect } from "react";
import useBackButton from "../../hooks/useBackButton";
import AppStats from "../shared/AppStats/AppStats";
import { appStoreActions, useAppDispatch } from "../../store";
import { getAppStatsRequest } from "../../services/stats";

const StatsPage = () => {
  useBackButton();

  const dispatch = useAppDispatch();

  const getAppStats = useCallback(async () => {
    try {
      const res = await getAppStatsRequest();
      dispatch(
        appStoreActions.setDebug({
          stats: res.data || {},
        })
      );
    } catch (error) {
      console.error("getAppStats error", error);
    }
  }, [dispatch]);

  useEffect(() => {
    getAppStats();
  }, [getAppStats]);

  return <AppStats />;
};

export default StatsPage;
