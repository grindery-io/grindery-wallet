import React from "react";
import { useParams } from "react-router";
import useBackButton from "../../../hooks/useBackButton";
import { selectAppStore, useAppSelector } from "../../../store";
import Loading from "../../shared/Loading/Loading";
import TokenDetails from "../../shared/TokenDetails/TokenDetails";

const TokenPage = () => {
  useBackButton();
  const { tokens } = useAppSelector(selectAppStore);

  const { id } = useParams();

  const tokenChain = id?.split(":")[0];
  const tokenAddresss = id?.split(":")[1];

  const token = tokens.find(
    (token) =>
      token.address.toLowerCase() === tokenAddresss?.toLowerCase() &&
      token.chain.toLowerCase() === tokenChain?.toLowerCase()
  );

  return token ? <TokenDetails token={token} /> : <Loading />;
};

export default TokenPage;
