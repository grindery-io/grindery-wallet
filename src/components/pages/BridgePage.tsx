import React, { useEffect, useState } from "react";
import useBackButton from "../../hooks/useBackButton";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { BridgeStatus } from "../../types/State";
import Loading from "../shared/Loading/Loading";
import { sortTokens } from "../../utils/sortTokens";
import { CHAINS } from "../../constants";

const BridgePage = () => {
  useBackButton();
  const dispatch = useAppDispatch();
  const { tokens } = useAppSelector(selectAppStore);
  const [loading, setLoading] = useState(true);
  const address1 =
    sortTokens(tokens)[1]?.address || sortTokens(tokens)[0]?.address || "";
  const address2 =
    sortTokens(tokens)[2]?.address ||
    sortTokens(tokens)[1]?.address ||
    sortTokens(tokens)[0]?.address ||
    "";

  useEffect(() => {
    dispatch(
      appStoreActions.setBridge({
        input: {
          tokenIn: address1 || "",
          amountIn: "",
          tokenOut: address2 || "",
          chainIn: CHAINS[0].id || "",
          chainOut: CHAINS[1].id || CHAINS[0].id || "",
        },
        status: BridgeStatus.WAITING,
      })
    );
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [address1, address2, dispatch]);

  return !loading ? <>Bridge</> : <Loading />;
};

export default BridgePage;
