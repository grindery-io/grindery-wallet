import React from "react";
import useBackButton from "../../hooks/useBackButton";
import DebugMenu from "../shared/DebugMenu/DebugMenu";

const DebugPage = () => {
  useBackButton();
  return <DebugMenu />;
};

export default DebugPage;
