import React, { useEffect } from "react";
import { useParams } from "react-router";
import useBackButton from "../../hooks/useBackButton";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import Loading from "../shared/Loading";
import { getBalanceRequest } from "../../services/balance";
import TokenView from "../shared/TokenView/TokenView";
import { TokenType } from "../shared/Token";

const TokenPage = () => {
  useBackButton();
  const dispatch = useAppDispatch();
  const {
    user,
    balance: { value: balance },
    tokens: { items },
  } = useAppSelector(selectAppStore);

  const { id } = useParams();

  const item = items.find((item) => item.id === id || item.address === id);

  const token: TokenType = {
    name: item?.name || "",
    symbol: item?.symbol || "",
    decimals: item?.decimals || 18,
    address: item?.address || "",
    icon: item?.logoURI || "",
    chain: item?.chainId?.toString() || "",
    balance: (item?.balance || 0).toString(),
    price: (item?.price || 0).toString(),
    priceUpdated: item?.updated || "",
  };

  useEffect(() => {
    const controller = new AbortController();
    if (item?.symbol !== "G1" && user?.patchwallet) {
      dispatch(
        appStoreActions.setToken({
          id: item?.id,
          loading: true,
        })
      );
      getBalanceRequest(user.patchwallet, item?.address, "matic", controller)
        .then((res) => {
          dispatch(
            appStoreActions.setToken({
              id: item?.id,
              balance: parseFloat(res?.data?.balanceEther) || 0,
              updated: new Date().toString(),
              loading: false,
              cached: false,
            })
          );
        })
        .catch(() => {
          dispatch(
            appStoreActions.setToken({
              id: item?.id,
              loading: false,
              cached: true,
            })
          );
        });
    } else {
      if (item?.symbol === "G1") {
        dispatch(
          appStoreActions.setToken({
            id: item?.id,
            balance: balance,
            updated: new Date().toString(),
            loading: false,
            cached: false,
          })
        );
      }
    }

    return () => {
      controller.abort();
    };
  }, [
    item?.id,
    item?.symbol,
    item?.address,
    user?.patchwallet,
    balance,
    dispatch,
  ]);

  return item ? <TokenView token={token} /> : <Loading />;
};

export default TokenPage;
