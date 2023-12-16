import React, { useEffect } from "react";
import { Box } from "@mui/material";
import ConvertTokensInput from "./ConvertTokensInput/ConvertTokensInput";
import ConvertTokensOutput from "./ConvertTokensOutput/ConvertTokensOutput";
import ConvertTokensButton from "./ConvertTokensButton/ConvertTokensButton";
import ConvertTokensInfo from "./ConvertTokensInfo/ConvertTokensInfo";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";
import { ConvertStatus } from "types";
import ConvertTokensSentMessage from "./ConvertTokensSentMessage";
import Loading from "../Loading/Loading";

const ConvertTokens = () => {
  const dispatch = useAppDispatch();
  const {
    convert: { status, input },
  } = useAppSelector(selectAppStore);

  useEffect(() => {
    dispatch(
      appStoreActions.setConvert({
        status: ConvertStatus.LOADING,
      })
    );
    // TODO: calculate real result on server
    setTimeout(() => {
      dispatch(
        appStoreActions.setConvert({
          status: ConvertStatus.WAITING,
          result:
            parseFloat(input.convert) > 0
              ? parseFloat(input.add) > 0
                ? (
                    parseFloat(input.add) * 10 +
                    parseFloat(input.convert) * 0.1
                  ).toString()
                : (parseFloat(input.convert) * 0.1).toString()
              : "",
        })
      );
    }, 1500);
  }, [input.convert, input.add, dispatch]);

  return (
    <>
      {(status === ConvertStatus.WAITING ||
        status === ConvertStatus.LOADING) && (
        <Box sx={ConvertTokensStyles}>
          <ConvertTokensInfo />
          <ConvertTokensInput />
          <ConvertTokensOutput />
          <ConvertTokensButton />
        </Box>
      )}
      {status === ConvertStatus.SENDING && <Loading />}
      {status === ConvertStatus.SENT && <ConvertTokensSentMessage />}
    </>
  );
};

const ConvertTokensStyles = {
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  gap: "0px",
  flexWrap: "nowrap",
};

export default ConvertTokens;
