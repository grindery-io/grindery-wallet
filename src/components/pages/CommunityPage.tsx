import React, { useCallback, useEffect } from "react";
import CommunityList from "../shared/CommunityList/CommunityList";
import BottomNavigation from "../shared/BottomNavigation/BottomNavigation";
import { appStoreActions, useAppDispatch } from "../../store";
import { getConfigRequest } from "../../services/config";
import { STORAGE_KEYS } from "../../constants";

const CommunityPage = () => {
  const dispatch = useAppDispatch();

  const getDynamicData = useCallback(async () => {
    if (!window.Telegram?.WebApp?.initData) {
      return;
    }
    try {
      const res = await getConfigRequest();
      const community = res.data?.config?.filter(
        (c: any) =>
          c.fields.Type === "Community" && c.fields.Status === "Published"
      );
      const apps = res.data?.config?.filter(
        (c: any) => c.fields.Type === "App" && c.fields.Status === "Published"
      );
      const updated = new Date().toISOString();
      dispatch(
        appStoreActions.setCommunity({
          items: community,
          loading: false,
          updated: updated,
        })
      );
      dispatch(
        appStoreActions.setApps({
          items: apps,
          loading: false,
          updated: updated,
        })
      );
      localStorage.setItem(
        STORAGE_KEYS.COMMUNITY,
        JSON.stringify(community || [])
      );
      localStorage.setItem(STORAGE_KEYS.COMMUNITY_UPDATED, updated);
      localStorage.setItem(STORAGE_KEYS.APPS, JSON.stringify(apps || []));
      localStorage.setItem(STORAGE_KEYS.APPS_UPDATED, updated);
    } catch (error) {
      console.error("getDynamicData error", error);
    }
  }, [dispatch]);

  useEffect(() => {
    getDynamicData();
  }, [getDynamicData]);

  return (
    <>
      <CommunityList />
      <BottomNavigation />
    </>
  );
};

export default CommunityPage;
