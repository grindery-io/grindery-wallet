import React from "react";
import BottomNavigation from "../shared/BottomNavigation";
import ActivitiesList from "../shared/ActivitiesList/ActivitiesList";

const ActivitiesPage = () => {
  return (
    <>
      <ActivitiesList />
      <BottomNavigation />
    </>
  );
};

export default ActivitiesPage;
