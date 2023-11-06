import React from "react";
import useBackButton from "../../hooks/useBackButton";
import TokensSearch from "../shared/TokensSearch/TokensSearch";

const TokensImportPage = () => {
  useBackButton();

  return <TokensSearch />;
};

export default TokensImportPage;
