import React from "react";
import { useParams } from "react-router";
import useBackButton from "../../../hooks/useBackButton";
import { selectAppStore, useAppSelector } from "../../../store";
import Loading from "../../shared/Loading";
import TokenView from "../../shared/TokenView/TokenView";

const TokenPage = () => {
  useBackButton();
  const { tokens } = useAppSelector(selectAppStore);

  const { id } = useParams();

  const token = tokens.find(
    (token) => token.address.toLowerCase() === id?.toLowerCase()
  );

  return token ? <TokenView token={token} /> : <Loading />;
};

export default TokenPage;
