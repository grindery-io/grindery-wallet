import React, { useCallback, useEffect } from "react";
import useBackButton from "../../hooks/useBackButton";
import AppStats from "../shared/AppStats/AppStats";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { getAppStatsRequest } from "../../services/stats";
import Loading from "../shared/Loading";

const StatsPage = () => {
  useBackButton();

  const dispatch = useAppDispatch();
  const {
    debug: { stats },
  } = useAppSelector(selectAppStore);

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

  return stats ? <AppStats /> : <Loading />;
};

export default StatsPage;
