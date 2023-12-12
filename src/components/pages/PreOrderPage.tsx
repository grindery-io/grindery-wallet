import React from "react";
import useBackButton from "hooks/useBackButton";
import { selectAppStore, useAppSelector } from "store";
import Loading from "components/shared/Loading/Loading";
import ConvertTokens from "components/shared/ConvertTokens/ConvertTokens";

const PreOrderPage = () => {
  useBackButton();
  const { user } = useAppSelector(selectAppStore);

  return user?.patchwallet ? <ConvertTokens /> : <Loading />;
};

export default PreOrderPage;
