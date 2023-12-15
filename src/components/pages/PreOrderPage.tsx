import React, { useEffect } from "react";
import useBackButton from "hooks/useBackButton";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";
import Loading from "components/shared/Loading/Loading";
import ConvertTokens from "components/shared/ConvertTokens/ConvertTokens";
import { ConvertStatus } from "types";

const PreOrderPage = () => {
  useBackButton();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAppStore);

  useEffect(() => {
    dispatch(
      appStoreActions.setConvert({
        input: {
          convert: "",
          add: "",
        },
        result: "",
        status: ConvertStatus.WAITING,
      })
    );

    alert(
      `The page is in the sandbox mode.\n\nNo real order will be placed, all numbers are fake.`
    );
  }, [dispatch]);

  return user?.patchwallet ? <ConvertTokens /> : <Loading />;
};

export default PreOrderPage;
